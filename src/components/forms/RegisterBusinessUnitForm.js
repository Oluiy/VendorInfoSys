"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// TODO: Connect to an API function
// import { registerBusinessUnit } from "@/lib/api";

const formSchema = z.object({
  businessUnitName: z.string().min(2, "Name must be at least 2 characters."),
  location: z.string().min(3, "Location must be at least 3 characters."),
});

export function RegisterBusinessUnitForm() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      businessUnitName: "",
      location: "",
    },
  });

  async function onSubmit(values) {
    console.log("Registering Business Unit:", values);
    // await registerBusinessUnit(values);
    // TODO: Add toast notification for success
    form.reset();
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Register Standalone Business Unit</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="businessUnitName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Business Unit Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Downtown Branch" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Input placeholder="123 Main St, Anytown" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Register Unit</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
