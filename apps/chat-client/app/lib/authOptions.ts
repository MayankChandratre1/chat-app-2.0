import CredentialsProvider from "next-auth/providers/credentials";
import prisma from '@repo/db/prisma'
import bcrypt from "bcrypt"
const authOptions = {
providers: [
  CredentialsProvider({
    // The name to display on the sign in form (e.g. "Sign in with...")
    name: "Credentials",
    // `credentials` is used to generate a form on the sign in page.
    // You can specify which fields should be submitted, by adding keys to the `credentials` object.
    // e.g. domain, username, password, 2FA token, etc.
    // You can pass any HTML attribute to the <input> tag through the object.
    credentials: {
      username: { label: "Username", type: "text", placeholder: "jsmith" },
      password: { label: "Password", type: "password" }
    },
    async authorize(credentials, req) {
        const username = credentials?.username
        const password = credentials?.password
        const existingUser = await prisma?.user.findFirst({
          where:{
            username
          }
        })
        if(existingUser){
          const verified = await bcrypt.compare(password || "", existingUser.password)
          console.log(verified);
          if(verified)
            return existingUser
        }
        return null
    }
  })
],
secrets: process.env.NEXTAUTH_SECRET || "secret",
pages:{
  signIn:"/auth/signin"
}
}

export default authOptions;