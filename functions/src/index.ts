import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as sgMail from '@sendgrid/mail';

// Initialize Firebase Admin SDK
admin.initializeApp();

// Set your SendGrid API Key
sgMail.setApiKey('YOUR_SENDGRID_API_KEY'); 

/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import {onRequest} from "firebase-functions/v2/https";
import * as logger from "firebase-functions/logger";

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

// export const helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
