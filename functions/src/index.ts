import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
admin.initializeApp();

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
export const helloWorld = functions.https.onRequest((request, response) => {
    functions.logger.info("Hello logs!", { structuredData: true });
    response.send("Hello from Firebase by TypeScript!");
});

export const hochiminhWeather = functions.https.onRequest((request, response) => {
    //promise contains document snapshot
    const promise = admin.firestore().doc("cities-weather/hochiminh").get();
    promise.then(snapshot => {
        const data = snapshot.data();
        console.log(`Weather in Ho Chi Minh city is ` + snapshot.get('condition'));
        response.send(data); //send() will also terminate http trigger
    }).catch(error => { // must handle rejected case for the promise
        console.log(error);
        response.status(500).send(error);
    })
});
