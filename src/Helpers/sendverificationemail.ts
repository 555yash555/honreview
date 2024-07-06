import { Verification } from './../../node_modules/react-email/node_modules/next/dist/lib/metadata/types/metadata-types.d';
import { resend } from "@/lib/resend";
import { ApiResponse } from '@/types/apiresposne';
import VerificationEmail from '../../emails/verficationbemail';
  export async function sendverificationemail(email: string, Verificationtoken: string,username:string) : Promise<ApiResponse>{
    try{

      await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: email,
        subject: "Verification Code",
        react:VerificationEmail({username:username,otp:Verificationtoken,} )
      })
      return {success:true,message:"Verification email sent"};  
    }
    catch(e){
      console.error("email sending error",e)


      return {success:false,message:"couldn't send verification email"};  
    }
    
  };