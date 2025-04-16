'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Pen } from 'lucide-react';

interface ProfileProps {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
}

export function ProfileTab(defaultProfile: ProfileProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [profile, setProfile] = useState(defaultProfile);

    return (
        <div className="py-[2.5rem] px-[2.5rem] bg-[#FAFAFA] max-w-2xl mx-auto mt-[3rem] border border-[#00000010] rounded-2xl">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-xl font-medium mb-1">Personal Information</h1>
                    <p className="text-sm text-[#15151580]">Update your personal details here</p>
                </div>
                {!isEditing && (
                    <button
                        onClick={() => setIsEditing(true)}
                        className="text-sm text-[#184193] hover:text-[#184193]/80 flex items-center gap-1"
                    >
                        <Pen size={14} />
                        Edit
                    </button>
                )}
            </div>

            {isEditing ? (
                <form className="space-y-4">
                    <Input
                        label="First Name"
                        value={profile.firstName}
                        onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
                    />
                    <Input
                        label="Last Name"
                        value={profile.lastName}
                        onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
                    />
                    <Input
                        label="Email Address"
                        type="email"
                        value={profile.email}
                        onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    />
                    <Input
                        label="Phone Number"
                        type="tel"
                        value={profile.phone}
                        onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                    />
                    <Input
                        label="Address"
                        value={profile.address}
                        onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                    />
                    <div className="flex gap-5 pt-5 border-t border-[#00000010] m-5">
                        <Button
                            variant="outline"
                            className='bg-white'
                            onClick={() => setIsEditing(false)}
                        >
                            Cancel
                        </Button>
                        <Button onClick={() => setIsEditing(false)}>
                            Save Changes
                        </Button>
                    </div>
                </form>
            ) : (
                <div className="space-y-6">
                    <div>
                        <p className="text-sm text-[#15151580] mb-1">First Name</p>
                        <p className="font-medium">{profile.firstName}</p>
                    </div>
                    <div>
                        <p className="text-sm text-[#15151580] mb-1">Last Name</p>
                        <p className="font-medium">{profile.lastName}</p>
                    </div>
                    <div>
                        <p className="text-sm text-[#15151580] mb-1">Email Address</p>
                        <p className="font-medium">{profile.email}</p>
                    </div>
                    <div>
                        <p className="text-sm text-[#15151580] mb-1">Phone Number</p>
                        <p className="font-medium">{profile.phone}</p>
                    </div>
                    <div>
                        <p className="text-sm text-[#15151580] mb-1">Address</p>
                        <p className="font-medium">{profile.address}</p>
                    </div>
                </div>
            )}
        </div>
    );
}