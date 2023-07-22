1. in RegisterModal, we use the react hook form to extract the data from the input fields via register function and onSubmit={handleSubmit(onSubmit)}, data registered via register function is auto-incorporated into the handlesubmit-> onSubmit and can be used as data param
2. we use the axios in RegisterModal to send a post request with the data to the app -> /api/register route link FE->BE
3. at '/api/register/', we accept the request, extract the body, HASH the password in BE, server side to store in DB the hashed value not the real password, create a new entry (obj) to the DB and return that entry as a NextResponse.json(obj)

During the tutorial I have stumbled on figuring out the next-auth. In reality, next-auth is an authenticationa and authorisation tool. Meaning the steps above register a user, while next-auth and currently via the prisma provider, we authenticate (sign in), the user. next-auth sets the login form with credentials, checks them for inconsistencies (validation service of DB data [see mongoose does not provide and is done manually](https://github.com/VasilGVasilev/softuni-JS-Back-End/blob/main/ExamPrep/exam/my-skeleton/services/authServices.js)), creates a webtoken (jwt) and provides way to persist it + NextResponse obj, not like [mongoose where it is manual](https://github.com/VasilGVasilev/softuni-JS-Back-End/blob/main/ExamPrep/exam/my-skeleton/controllers/authController.js)

It is important to differentiate between validation of data via the react-hook-form when we set requirements such as min lenght of password or empty fields and later validation of input data in comparison with DB data -> user not found, wrong password.

4. in LoginModal, unlike RegisterModal, we do not apply the axios library, rather next-auth (signIn). In particular, we use react-hook-form SubmitHandler to pass on data (object with email, pass, etc.) to the [signIn](https://next-auth.js.org/getting-started/client#signin) function from next-auth. The signIn function in next-auth/react will handle the sign-in process based on the configuration of the credentialsProvider if username and password credentials are used. NB1
BUT we do not know we are logged in. We must extract the currently logged in user via getting rthe session of authoptions. For that we have a custom action. Then we attach the extracted currently logged in user and put it as a prop in whichever component we need.

NB1 - mind that I used pages, if I used the app (unstable at the moment of creating this clone), the [...nextauth] will generate a path on /api/auth and if go directly to /api/auth/signin we will use the form generated with the configurations for label, placeholder, etc. To use our own form we apply the data to onSubmit in our Login component:
```sh
    signIn('credentials', { 
      ...data, 
      redirect: false,
    })
```

5. Social login
- github go to settings/developer settings/OAuthApp -> create and copy envs to post clientID and clientSecret (URLs for production should be localhost:3000), then add on submit button in Regsiter/Login modal to be:

```sh
    onClick={()=>signIn('github')}
```