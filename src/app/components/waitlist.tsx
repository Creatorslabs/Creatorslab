"use client";

import { Label, TextInput } from "flowbite-react";
import { HiMail } from "react-icons/hi";

export function Component() {
  return (
    <div className="max-w-md">
      <div className="mb-2 block">
        <Label htmlFor="email4" value="Your email" />
      </div>
      <TextInput
        id="email4"
        type="email"
        rightIcon={HiMail}
        placeholder="name@flowbite.com"
        required
      />
    </div>
  );
}
