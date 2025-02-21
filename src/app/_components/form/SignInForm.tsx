'use client'

import { Button } from "~/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "~/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Input } from "~/components/ui/input";
import Link from "next/link";
import { useRouter } from "next/navigation";

 
const FormSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid Email'),
  password: z.string().min(1, 'Password is required').min(8, 'Password must have 8 character')
})

const SignInForm = () => {
  const router = useRouter()
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
          email: "",
        },
      })

      const onSubmit = async (values: z.infer<typeof FormSchema> ) =>{
        const response = await fetch('/api/sign-in',{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: values.email,
            password: values.password
          })
        })
        if (response.ok) {
          router.push('/categories');
        } else {
          console.log('Registration failed', Error);
          
        }
      }


    return (
    <div className=" border rounded-2xl border-slate-500 p-5 pt-5 px-10 mb-32">
      <div className="text-center text-2xl pt-0 mb-6 align-text-top">
        <h1><b>Login</b></h1>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
          
          <div className="space-y-2">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Email" type="email" {...field} />
                </FormControl>
                <FormDescription>
                  
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm">Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          </div>
          

          <Button className="w-full mt-6" type="submit">Sign In</Button>
        </form>
        <div className='mx-auto my-4 flex w-full items-center justify-evenly before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400 after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400'>
          or
        </div>
        <p className='text-center text-xs text-gray-600 mt-2'>
          If you don&apos;t have an account, please&nbsp;
          <Link className='text-blue-500 hover:underline' href='/sign-up'>
            Sign up
          </Link>
        </p>
      </Form>
    </div>
    )
}

export default SignInForm;