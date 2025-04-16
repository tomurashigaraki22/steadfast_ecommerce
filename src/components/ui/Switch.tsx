'use client';

import * as React from 'react';
import * as SwitchPrimitives from '@radix-ui/react-switch';

export function Switch({ checked, onCheckedChange }: { checked: boolean; onCheckedChange: (checked: boolean) => void }) {
    return (
        <SwitchPrimitives.Root
            checked={checked}
            onCheckedChange={onCheckedChange}
            className={`
                w-11 h-6 rounded-full relative
                ${checked ? 'bg-[#184193]' : 'bg-gray-200'}
                transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#184193]
            `}
        >
            <SwitchPrimitives.Thumb className={`
                block w-4 h-4 bg-white rounded-full
                transition-transform
                ${checked ? 'translate-x-6' : 'translate-x-1'}
            `} />
        </SwitchPrimitives.Root>
    );
}