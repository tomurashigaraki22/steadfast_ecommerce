'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
 
export function SecurityTab() {
 
    return (
        <div className="py-[2.5rem] px-[2.5rem] bg-[#FAFAFA] max-w-2xl mx-auto mt-[3rem] border border-[#00000010] rounded-2xl">
            <div className="mb-6">
                <h1 className="text-xl font-medium mb-1">Security</h1>
                <p className="text-sm text-[#15151580]">For your security, use a strong, unique password with a mix of letters, numbers & symbols.</p>
            </div>

            <form className="space-y-4">
                <Input
                    label="Old Password"
                    type={"password"}
                    isPassword={true}
                />
                <Input
                    label="New Password"
                    type={"password"}
                    isPassword={true}

                />
                <Input
                    label="Confirm Password"
                    type={"password"}
                    isPassword={true}

                />
                <div className="flex gap-5 pt-5 border-t border-[#00000010] mt-5">
                         <Button variant="outline" className="bg-white">
                            Cancel
                        </Button>
                        <Button>
                            Update Password
                        </Button>
                 </div>
            </form>
        </div>
    );
}