import React from 'react'

const ContactUs = () => {
    return (
        <div className="text-center px-6 py-16 lg:px-32 w-full overflow-hidden" id="Contact"
             ><h1
            className="text-2xl sm:text-4xl font-medium mb-2 text-center">Contact <span
            className="underline underline-offset-4 decoration-1 under font-light">With Us</span></h1>
            <form className="max-w-2xl mx-auto text-gray-600 pt-8">
                <div className="w-full text-left">Email<input
                    className="w-full border border-gray-300 rounded py-3 px-4 mt-2" type="email" name="Email"
                    placeholder="Your Email" required=""/></div>
                <div className="my-6 text-left">Message<textarea
                    className="w-full border border-gray-300 rounded py-3 px-4 mt-2 h-48 resize-none" name="Message"
                    placeholder="Message" required=""></textarea></div>
                <button className="bg-[#0A65CC] text-white px-8 py-3 rounded cursor-pointer hover:bg-blue-400">Send Message</button>
            </form>
        </div>
    )
}

export default ContactUs
