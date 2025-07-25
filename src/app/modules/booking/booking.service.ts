import AppError from "../../ErrorHelpers/appError";
import { Users } from "../user/user.model";
import { BOOKING_STATUS, IBooking } from "./booking.interface";
import httpStatus from "http-status-codes";
import { Booking } from "./booking.module";
import { Tour } from "../tour/tour.model";
import { Payment } from "../payment/payment.module";
import { PAYMENT_STATUS } from "../payment/payment.interface";
import { SSLService } from "../sslCommerz/ssl.service";

const getTransactionId = () => {
        return `trun${Date.now()}_${Math.floor(Math.random() * 1000)}`
}

const createBooking = async (payload: Partial<IBooking>, userId: string) => {
        const transactionId = getTransactionId()

        const session = await Booking.startSession()
        session.startTransaction()

        try {
                const user = await Users.findById(userId)

                if (!user?.phone || !user?.address) {
                        throw new AppError(httpStatus.BAD_REQUEST, "Please update your user Profile information to book a tour")
                }


                const tour = await Tour.findById(payload.tour).select("costFrom")

                if (!tour?.costFrom) {
                        throw new AppError(httpStatus.BAD_REQUEST, "no tour cost found")
                }

                const totalAmount = Number(tour?.costFrom) * Number(payload.guestCount as number)

                //booking 
                const booking = await Booking.create([{
                        ...payload,
                        user: userId,
                        status: BOOKING_STATUS.PENDING,

                }], { session })

                //payment 
                const payment = await Payment.create([{
                        booking: booking[0]._id,
                        status: PAYMENT_STATUS.UNPAID,
                        amount: totalAmount,
                        transactionId: transactionId
                }], { session })
                console.log("payment", payment[0])

                const updateBooking = await Booking
                        .findByIdAndUpdate(
                                booking[0]._id,
                                { payment: payment[0]._id },
                                { new: true, runValidators: true, session }
                        )
                        .populate("user", "name email phone address")
                        .populate("tour", "title costFrom")
                        .populate("payment");

                const userName = (updateBooking?.user as any).name;
                const userEmail = (updateBooking?.user as any).email;
                const userAddress = (updateBooking?.user as any).address;
                const userphone = (updateBooking?.user as any).phone;


                const sslPayload = {
                        transactionId: transactionId,
                        amount: totalAmount,
                        name: userName,
                        email: userEmail,
                        phone: userphone,
                        address: userAddress
                }


                const sslPayment = await SSLService.sslCommerzInit(sslPayload)
                console.log("updateBooking", updateBooking)
                await session.commitTransaction();
                session.endSession()
                return {
                        paymentUrl:sslPayment.GatewayPageURL,
                        booking:updateBooking
                };

        } catch (err: any) {
                await session.abortTransaction();
                session.endSession()
                throw err;
        }



}

const getUserBookings = async () => {
        return {}

}

const getAllBookings = async () => {
        return {}

}

const getBookingById = async () => {
        return {}

}

const updateBookingStatus = async () => {
        return {}

}

export const BookingService = {
        createBooking,
        getUserBookings,
        getBookingById,
        getAllBookings,
        updateBookingStatus
}