import React from 'react'
import { Badge } from '@/components/ui/badge'
import { BorderBeam } from './magicui/border-beam'
import useStore from '@/zustand/store'
import Copy from './copy'
import { Skeleton } from './ui/skeleton'

export const UserOutput = () => {
    const { bioList } = useStore()
    return (
        <div className="relative flex min-h-[50vh] mt-2 flex-col rounded-xl bg-muted/50 backdrop-blur-sm overflow-hidden border border-primary/5">
            {bioList.length > 0 && <BorderBeam size={1200} borderWidth={1.5} duration={4} />}
            <Badge variant="outline" className='absolute top-3 right-3 z-50'>
                Output
            </Badge>
            {bioList.length > 0 ? <ul className="flex flex-col items-start justify-start space-y-8 sm:space-y-12 p-8 py-12 xs:p-8 xs:py-12 sm:p-12 lg:p-16">
                {bioList.map((data, index) => (
                    <li
                        key={index}
                        className="w-full text-sm xs:text-base border border-primary/20 rounded-md p-4 relative bg-background rounded-br-none"
                    >
                        {/* @ts-ignore */}
                        {data.bio}
                        <span className="absolute top-[99%] right-0 cursor-pointer">
                            {/* @ts-ignore */}
                            <Copy text={data.bio} />
                        </span>
                    </li>
                ))}
            </ul> : <Skeleton className="w-full h-full" />}
        </div>
    )
}
