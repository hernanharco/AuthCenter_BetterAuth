"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from 'next/link';

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email." }),
  password: z.string().min(1, { message: "Password is required." }),
});

const GoogleIcon = () => (
    <svg className="h-5 w-5 mr-3" viewBox="0 0 24 24">
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </svg>
  );

export default function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    console.log("Login submitted", values);
    // Mock login
    setTimeout(() => {
      toast({
        title: "Success",
        description: "Login successful!",
      });
      router.push('/dashboard');
      setIsLoading(false);
    }, 1000);
  }

  async function handleGoogleSignIn() {
    setIsGoogleLoading(true);
    console.log("Google Sign In clicked");
    // Mock Google login
    setTimeout(() => {
      router.push('/dashboard');
      setIsGoogleLoading(false);
    }, 1000);
  }

  return (
    <div className="w-full max-w-sm">
      <div className="bg-primary shadow-lg rounded-lg p-8 text-primary-foreground">
        <h1 className="text-3xl font-bold text-center mb-2">¡Bienvenido de vuelta!</h1>
        <p className="text-center mb-6 text-primary-foreground/80">Inicia sesión para continuar.</p>
        
        <Button variant="outline" className="w-full mb-4 bg-accent hover:bg-accent/90 text-accent-foreground font-semibold" onClick={handleGoogleSignIn} disabled={isGoogleLoading || isLoading}>
          {isGoogleLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <GoogleIcon />
          )}
          Iniciar sesión con Google
        </Button>

        <div className="flex items-center my-6">
          <div className="flex-grow border-t border-primary-foreground/30"></div>
          <span className="mx-4 text-xs text-primary-foreground/80">o</span>
          <div className="flex-grow border-t border-primary-foreground/30"></div>
        </div>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-primary-foreground/90">Dirección de correo electrónico</FormLabel>
                  <FormControl>
                    <Input 
                      type="email" 
                      placeholder="Dirección de correo electrónico" 
                      {...field} 
                      className="bg-primary border-primary-foreground/30 placeholder:text-primary-foreground/60 focus:bg-white focus:text-black"
                    />
                  </FormControl>
                  <FormMessage className="text-white bg-red-500 rounded-sm px-2 py-1 text-xs" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-primary-foreground/90">Contraseña</FormLabel>
                  <FormControl>
                    <Input 
                      type="password" 
                      placeholder="Contraseña" 
                      {...field} 
                      className="bg-primary border-primary-foreground/30 placeholder:text-primary-foreground/60 focus:bg-white focus:text-black"
                    />
                  </FormControl>
                  <FormMessage className="text-white bg-red-500 rounded-sm px-2 py-1 text-xs" />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-bold" disabled={isLoading || isGoogleLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Iniciando sesión...
                </>
              ) : (
                "INICIAR SESIÓN"
              )}
            </Button>
          </form>
        </Form>
        <p className="text-center text-sm mt-6">
          ¿No tienes una cuenta? <Link href="/signup" className="font-semibold hover:underline">Regístrate</Link>
        </p>
      </div>
    </div>
  );
}
