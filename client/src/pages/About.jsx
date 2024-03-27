import CallToAction from '../components/CallToAction';

export default function About() {
  return (
    <div className='min-h-screen mt-7'>
      <div className='max-w-2xl mx-auto p-3 text-center flex-col '>
        <div>
        <h1 className='text-3xl font font-semibold text-center'>About
        <span className='text-orange-500 font-serif'> Lura's </span>Blog
        </h1>
        </div>
        
        <div className='text-md text-sm md:text-xl text-gray-500 flex flex-col gap-6  text-justify mt-7 '>
        <p >At Lura's Blog, we believe that diversity is the spice of life. Our platform is a melting pot of ideas, stories, and perspectives from all walks of life. Whether you're into travel, technology, fashion, food, or anything in between, you'll find something here to pique your interest.
        </p>
        <p>
        We're not just another blog. We're a community of passionate individuals sharing our experiences, insights, and discoveries with the world. From thought-provoking essays to light-hearted anecdotes, our content reflects the rich tapestry of human existence.
        </p>
         <p>
         Our team of writers is as diverse as our content. We come from different backgrounds, cultures, and professions, but we're united by our love for storytelling. We strive to create engaging and informative content that resonates with our readers.
         </p>
         <p>
         But Lura's Blog isn't just about us—it's about you, our readers. We want to hear from you! Whether you have a story to share, feedback to give, or just want to say hello, we're all ears. Your thoughts and ideas are what keep us going.
         </p>
         <p>
         So take a look around, explore our archives, and join the conversation. We're thrilled to have you along for the journey! 
         </p>

        </div>
        <div className='p-3 bg-amber-100 dark:bg-slate-700 mt-4'>
        <CallToAction />
      </div>
      </div>
    </div>
  )
}

