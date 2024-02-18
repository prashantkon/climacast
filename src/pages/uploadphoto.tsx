import { UserButton } from "@clerk/nextjs"
import { useRouter } from "next/router"
import { useState } from "react"

export default function UploadPhoto() {

    const [img_src, setSRC] = useState("image_sample.png")
    const [msg, setMSG] = useState("Upload Photo")
    const router = useRouter()

    function upload(e) {
        setMSG("Uploading...")
        const imgLink = URL.createObjectURL(inputFile.files[0]);
        setSRC(`url(${imgLink}))`);

        const file = e.files[0];
        const formData = new FormData();
        formData.append("image", file);

        // Make a POST request to the backend API
        fetch("http://127.0.0.1:5000/predict", {
            method: "POST",
            body: formData,
        })

        .then((response) => {
        if (response.ok) {

            return response.json(); // Parse the response as JSON
        } else {
            throw new Error("Error: " + response.status);
        }
        })
        .then((data) => {
            console.log(data);
            void router.push(`/resultstats&q=${data.prediction}`)
        })
        .catch((error) => {

        console.error(error);
        });
        setTimeout(() => {
            setMSG("Uploaded!")
            setSRC("home_img.png")
            void router.push('/resultstats')
        }, 1000)
    }

    return (
        <main className="bg-[#F7F7F7] h-[120vh]">
        <div className="bg-[#F7F7F7] mx-[2rem] mt-[1rem] flex min-h-screen flex-col ">
          <div className="flex flex-row">
            <img src="/logo.png" className="w-[40vw] mr-auto" />
            <UserButton appearance={{ variables: { colorPrimary: "green" } }} />
          </div>
          <div className="my-[2rem]">
            <p className="text-green-600 text-lg my-[0.75rem] font-semibold">UPLOAD A PHOTO</p>
            <h1 className="font-bold text-xl font-display text-2xl">Your Initial Environmental Assessment</h1>
            <h3 className="leading-8">Make sure you have a clear view.  Your lighting should be pure daylight.  The sky should cover ~50% of the photo.</h3>
          </div>
          <div id = "prediction">
                    <label htmlFor="input-file" id = "drop-area">
                        <input type="file" onClick={(e) => upload(e)} accept="image/*" id="input-file" hidden />
                        <div id = "img-view">
                            <p>Drag and drop or click here <br /> to upload image</p>
                            <button className="mr-auto ml-auto mt-[2rem] justify-left text-left bg-white text-green-600 w-[40vw] text-xl shadow-lg py-2 px-3 font-semibold rounded-md">
                                {msg}
                            </button>
                        </div>
                    </label>
                    <p id="output"></p>
                </div>
          <img src={img_src} /> 
          
        </div>
      </main>
    )
}