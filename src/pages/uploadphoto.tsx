import { UserButton } from "@clerk/nextjs"
import { useRouter } from "next/router"
import { useState, MouseEvent, ChangeEvent } from "react"

export default function UploadPhoto() {

    const [img_src, setSRC] = useState("image_sample.png")
    const [msg, setMSG] = useState("Upload Photo")
    const router = useRouter()
    const [file, setFile] = useState<undefined | File>(undefined)

    function upload() {
        setMSG("Uploading...")

        alert("AFTER SET MESSAGE")

        const formData = new FormData();

        console.log("GOTTEN FORM DATA")
        if(file == null) {
            alert("No image selected and fill is null");
            console.log("No image selected");

            return;
        }
        formData.append("image", file);

        alert(file);

        const data = {
            prediction: "Clear skies; All good!"
        
        }

        const urlsp = new URLSearchParams({ q: data.prediction })
        const reader = new FileReader();
        reader.readAsDataURL(file)

        reader.onloadend = () => {
            setSRC(reader.result)
        }


        alert(file)

        const prompt_response = prompt("Confirm that this is the correct photo (use true, or yes)")


        if(prompt_response == "true" || prompt_response == "yes") { 
            fetch("http://127.0.0.1:5000/predict", {
                method: "POST",
                body: formData,
            })
                .then((response) => response.json())
                .then(() => {
                    void router.push({
                        pathname: "/resultstats",
                        query: { q: data.prediction }
                    });
                    setMSG("Uploaded!")
                })
                .catch((error) => { console.log(error) })
        } else {
            setMSG("Upload another Photo")
        }
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
                        <input type="file" onChange={(e: ChangeEvent<HTMLInputElement>) => { 
                            setFile(e.currentTarget.files![0])
                        }} accept="image/*" />
                        <div id = "img-view">
                            <p>Drag and drop or click here <br /> to upload image</p>
                            <button onClick={() => upload()} className="mr-auto ml-auto mt-[2rem] justify-left text-left bg-white text-green-600 w-[40vw] text-xl shadow-lg py-2 px-3 font-semibold rounded-md">
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