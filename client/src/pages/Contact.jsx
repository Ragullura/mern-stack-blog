import { Alert,Button, Spinner, TextInput, Textarea } from "flowbite-react";
import { ImLocation2 } from "react-icons/im";
import { FiPhone } from "react-icons/fi";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Contact() {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const  [errorMessage, setErrorMessage]= useState(null);

    const onSubmit = async (event) => {
        event.preventDefault();
        

        // Get form data
        const formData = new FormData(event.target);
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');

        // Validate fields
        if (!name || !email || !message) {
            setLoading(false);
            return setErrorMessage("Please fill all fields!");// Don't proceed if any field is empty
        }
         try {
            setLoading(true);

                  //set error also null
            setErrorMessage(null);

        // If all fields are filled, proceed to submit the form
        formData.append("access_key", "713c1ed2-b84c-4177-a5df-c4df25dc6325");
        const object = Object.fromEntries(formData);
        const json = JSON.stringify(object);

        const res = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: json
        }).then((res) => res.json());

        setLoading(false);
        if (res.success) {
            navigate('/');
        }
            
         } catch (error) {
            //This error for client side network issue 
            setErrorMessage(error.message);
            setLoading(false);
            
         }
            
    };

    return (
        <section className="bg-blue-50 dark:bg-slate-800" id="contact">
            <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
                <div className="mb-4">
                    <div className="mb-6 max-w-3xl text-center sm:text-center md:mx-auto md:mb-12">
                        <p className="text-base font-semibold uppercase tracking-wide text-blue-600 dark:text-blue-200">
                            Contact
                        </p>
                        <h2 className="font-heading mb-4 font-bold tracking-tight text-gray-900 dark:text-white text-3xl sm:text-5xl">
                            Get in Touch
                        </h2>
                        <p className="mx-auto mt-4 max-w-3xl text-xl text-gray-600 dark:text-slate-400">
                            "Connect with us today and let's build something incredible together."
                        </p>
                    </div>
                </div>
                <div className="flex items-stretch justify-center">
                    <div className="grid md:grid-cols-2">
                        <div className="h-full pr-6 text-justify">
                            <p className="mt-3 mb-12 text-lg text-gray-600 dark:text-slate-400">
                                Have questions, feedback, or just want to say hello? We’d love to hear from you! Use the contact information below to reach out to us, and we’ll get back to you as soon as possible.
                            </p>
                            <ul className="mb-6 md:mb-0">
                                <li className="flex">
                                    <div className="flex h-10 w-10 items-center justify-center rounded bg-blue-900 text-gray-50 hover:text-rose-300">
                                        <ImLocation2 className='w-8 h-8 hover:text-teal-400' />
                                    </div>
                                    <div className="ml-4 mb-4">
                                        <h3 className="mb-2 text-lg font-medium leading-6 text-gray-900 dark:text-white">Our Address
                                        </h3>
                                        <p className="text-gray-600 dark:text-slate-400">
                                            6/123,vadapalani Street Gowindha Road</p>
                                        <p className="text-gray-600 dark:text-slate-400">Salem,
                                            Tamil Nadu</p>
                                    </div>
                                </li>
                                <li className="flex">
                                    <div className="flex h-11 w-11 items-center justify-center rounded bg-blue-900 text-gray-50">
                                        <FiPhone className='w-8 h-8 hover:text-teal-400' />
                                    </div>
                                    <div className="ml-4 mb-4">
                                        <h3 className="mb-2 text-lg font-medium leading-6 text-gray-900 dark:text-white">Contact
                                        </h3>
                                        <p className="text-gray-600 dark:text-slate-400">Mobile: +91-9991155321</p>
                                        <p className="text-gray-600 dark:text-slate-400">Mail: lurablog@gmail.com</p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div className="card h-fit max-w-6xl p-5 md:p-12" id="form">
                            <h2 className="mb-4 text-2xl font-bold">Ready to Get Started?</h2>
                            <form onSubmit={onSubmit} id="contactForm">
                                <div className="mb-6">
                                    <div className="mx-0 mb-1 sm:mb-4">
                                        <div className="mx-0 mb-1 sm:mb-4">
                                            <label className="pb-1 text-xs uppercase tracking-wider"></label>
                                            <TextInput type="text" placeholder="Your name" className="mb-2 w-full rounded-md border border-gray-400 py-2 pl-2 pr-4 shadow-md dark:text-gray-300 sm:mb-0" name="name" />
                                        </div>
                                        <div className="mx-0 mb-1 sm:mb-4">
                                            <label className="pb-1 text-xs uppercase tracking-wider"></label>
                                            <TextInput type="email" placeholder="Your email address" className="mb-2 w-full rounded-md border border-gray-400 py-2 pl-2 pr-4 shadow-md dark:text-gray-300 sm:mb-0" name="email" />
                                        </div>
                                    </div>
                                    <div className="mx-0 mb-1 sm:mb-4">
                                        <label className="pb-1 text-xs uppercase tracking-wider"></label>
                                        <Textarea cols="30" rows="5" placeholder="Write your message..." className="mb-2 w-full rounded-md border border-gray-400 py-2 pl-2 pr-4 shadow-md dark:text-gray-300 sm:mb-0" name="message" />
                                    </div>
                                </div>
                                <div className="text-center">
                                    <Button type="submit" outline className="w-full" gradientDuoTone='purpleToPink'>
                                        {loading ? (<><Spinner /><span className='pl-3'>Loading...</span></>) : ('Send Message')}
                                    </Button>
                                </div>
                            </form>
                            {
            errorMessage && (
              <Alert className='mt-5' color='failure'>
                {errorMessage}
              </Alert>
            )
          }
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
