import dotenv from "dotenv";

dotenv.config();

interface IEnvVars {
    port: string,
    DB_Url: string,
    node_env: string,
    secret: string,
    expiresIn: string,
    becrypt_salt_round: string,
    super_admin_email: string,
    super_admin_pass: string,
    refresh_secret: string,
    refresh_expiresIn: string,
    EXPRESS_SESSION_SECRET: string,
    GOOGLE_CLIENT_SECRET: string,
    GOOGLE_CLIENT_ID: string,
    GOOGLE_CALLBACK_URL: string,
    SSL: {
        STORE_ID: string,
        STORE_PASS: string,
        SSL_PAYMENT_API: string,
        SSL_VALIDATION_API: string,
        SSL_SUCCESS_FRONTEND_URL: string,
        SSL_FAIL_FRONTEND_URL: string,
        SSL_CANCEL_FRONTEND_URL: string,
        SSL_SUCCESS_BACKEND_URL: string,
        SSL_FAIL_BACKEND_URL: string,
        SSL_CANCEL_BACKEND_URL: string,
    },
    CLOUDINARY: {
        CLOUDINARY_CLOUD_NAME: string;
        CLOUDINARY_API_KEY: string;
        CLOUDINARY_API_SECRET: string;
    },
    //     EMAIL_SENDER: {
    //     SMTP_USER: string;
    //     SMTP_PASS: string;
    //     SMTP_PORT: string;
    //     SMTP_HOST: string;
    //     SMTP_FROM: string;
    // };


}

const loadEnvVars = (): IEnvVars => {
    const requiredEnvVars: string[] = ["port", "DB_Url", "node_env", "secret", "expiresIn", "becrypt_salt_round", "super_admin_email", "super_admin_pass", "refresh_expiresIn", "refresh_secret", "EXPRESS_SESSION_SECRET", "GOOGLE_CLIENT_SECRET", "GOOGLE_CLIENT_ID", "GOOGLE_CALLBACK_URL",
        "SSL_STORE_ID",
        "SSL_STORE_PASS",
        "SSL_PAYMENT_API", "SSL_VALIDATION_API",
        "SSL_SUCCESS_FRONTEND_URL",
        "SSL_FAIL_FRONTEND_URL",
        "SSL_CANCEL_FRONTEND_URL",
        "SSL_SUCCESS_BACKEND_URL",
        "SSL_FAIL_BACKEND_URL",
        "SSL_CANCEL_BACKEND_URL",
        "CLOUDINARY_CLOUD_NAME",
        "CLOUDINARY_API_KEY",
        "CLOUDINARY_API_SECRET",
        // "SMTP_PASS",
        // "SMTP_PORT",
        // "SMTP_HOST",
        // "SMTP_USER",
        // "SMTP_FROM",
    ]

    requiredEnvVars.forEach(key => {
        if (!process.env[key]) {
            throw new Error(`Missing require environment variable ${key}`)
        }
    })

    return {
        port: process.env.port as string,
        DB_Url: process.env.DB_URL!,
        node_env: process.env.node_env as string,
        secret: process.env.secret as string,
        expiresIn: process.env.expiresIn as string,
        becrypt_salt_round: process.env.becrypt_salt_round as string,
        super_admin_email: process.env.super_admin_email as string,
        super_admin_pass: process.env.super_admin_pass as string,
        refresh_secret: process.env.refresh_secret as string,
        refresh_expiresIn: process.env.refresh_expiresIn as string,
        EXPRESS_SESSION_SECRET: process.env.EXPRESS_SESSION_SECRET as string,
        GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET as string,
        GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID as string,
        GOOGLE_CALLBACK_URL: process.env.GOOGLE_CALLBACK_URL as string,
        SSL: {
            STORE_ID: process.env.SSL_STORE_ID as string,
            STORE_PASS: process.env.SSL_STORE_PASS as string,
            SSL_PAYMENT_API: process.env.SSL_PAYMENT_API as string,
            SSL_VALIDATION_API: process.env.SSL_VALIDATION_API as string,
            SSL_SUCCESS_FRONTEND_URL: process.env.SSL_SUCCESS_FRONTEND_URL as string,
            SSL_FAIL_FRONTEND_URL: process.env.SSL_FAIL_FRONTEND_URL as string,
            SSL_CANCEL_FRONTEND_URL: process.env.SSL_CANCEL_FRONTEND_URL as string,
            SSL_SUCCESS_BACKEND_URL: process.env.SSL_SUCCESS_BACKEND_URL as string,
            SSL_FAIL_BACKEND_URL: process.env.SSL_FAIL_BACKEND_URL as string,
            SSL_CANCEL_BACKEND_URL: process.env.SSL_CANCEL_BACKEND_URL as string,
        },
        
              CLOUDINARY: {
            CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME as string,
            CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY as string,
            CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET as string,
        },
        // EMAIL_SENDER: {
        //     SMTP_USER: process.env.SMTP_USER as string,
        //     SMTP_PASS: process.env.SMTP_PASS as string,
        //     SMTP_PORT: process.env.SMTP_PORT as string,
        //     SMTP_HOST: process.env.SMTP_HOST as string,
        //     SMTP_FROM: process.env.SMTP_FROM as string,
        // },
    }
}
export const envVars = loadEnvVars()