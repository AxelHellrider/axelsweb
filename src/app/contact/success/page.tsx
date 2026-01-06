export default function Success() {
    return (
        <div className="w-auto mx-auto my-4 rounded-2xl bg-black/60 backdrop-blur-md
                   ring-1 ring-white/10 shadow-[0_0_20px_rgba(0,150,255,0.25)]
                   p-4 text-white text-center lg:max-w-2xl">
            <h1 className="text-3xl font-semibold bg-gradient-to-r from-blue-200 to-white bg-clip-text text-transparent">Thank you!</h1>
            <p>Your message has been received. I’ll get back to you shortly.</p>
        </div>
    );
}
