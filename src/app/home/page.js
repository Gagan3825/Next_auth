import { signOut } from '@/lib/auth'
import { redirect } from 'next/navigation';
import React from 'react'

function page() {
  return (
    <>
    
    <div>Welcome to my home page</div>
    <form action={async()=>{
        'use server'
        await signOut();
        
    }}>

    <button>signOut</button>
    </form>
    </>
  )
}

export default page