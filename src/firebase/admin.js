import admin = require('firebase-admin')
admin.initializeApp({
  serviceAccountId: '9TPFuUVXOyVgu2q7T8oFNOkmHaJ3@my-first-69748.iam.gserviceaccount.com',
});

var uid = "some-uid";
var additionalClaims = {
  premiumAccount: true
};

admin.auth().createCustomToken(uid, additionalClaims)
.then(function(customToken) {
  // Send token back to client
})
.catch(function(error) {
  console.log("Error creating custom token:", error);
});
