import { Button } from "flowbite-react";

export default function CallToAction() {
  return (
    <div className="flex flex-col sm:flex-row p-3 
    border border-teal-600 justify-center
    items-center rounded-tl-3xl rounded-br-3xl text-center">
        <div className="flex-1 justify-center flex flex-col">
            <h2 className="text-3xl ">Want to Create Your  Own Content</h2>
            <p className="text-gray-500 my-2">Checkout my Pages</p>
            <Button gradientDuoTone='purpleToPink' className="rounded-tl-xl rounded-bl-none ">
                <a href="https://www.google.com"
                target="_blank" rel="noopener noreferrer"
                >Go To My Website
                </a>
            </Button>
        </div>
        <div className="p-7 flex-1">
            <img src="https://www.expandgh.com/wp-content/uploads/2017/11/blog-1.jpg" />
        </div>

    </div>
  )
}
