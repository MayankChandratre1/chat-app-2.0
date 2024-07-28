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
      phone: { label: "Phone", type: "text", placeholder: "jsmith" },
      password: { label: "Password", type: "password" }
    },
    async authorize(credentials, req) {
        const phone = credentials?.phone
        const password = credentials?.password
        const existingUser = await prisma?.user.findFirst({
          where:{
            phone
          }
        })
        if(existingUser){
          const verified = await bcrypt.compare(password || "", existingUser.password)
          if(verified)
            return {...existingUser}
        }
        return null
    }
  })
],
secrets: process.env.NEXTAUTH_SECRET || "secret",
pages:{
  signIn:"/auth/signin"
},
callbacks:{
  jwt: async ({ user, token }: any) => {
    if (user) {
        token.uid = user.id;
        token.phone = user.phone,
        token.username = user.username,
        token.image = user.profile_pic
    }
    return token;
    },
  session: async ({ session, token, user }: any) => {
      if (session.user) {
          session.user.id = token.uid,
          session.user.phone = token.phone,
          session.user.username = token.username,
          session.user.image = token.image
      }
      return session
  }
}
}

export default authOptions;