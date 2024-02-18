import { UserButton, useUser } from "@clerk/nextjs";
import ProgressBar from "components/svgs/progressbar";
import { useSearchParams  } from "next/navigation"
import { api } from "~/utils/api";
import { useEffect, useState  } from "react";

export default function ResultsStats() {

    useEffect(() => {
      setWindow(window)
    }, [])

    const searchParms = useSearchParams()
    const { mutate } = api.climates.addReport.useMutation()
    const [coors, setCoors] = useState({lat: 0, lng: 0})
    const [windows, setWindow] = useState(window)
    const { user } = useUser()


    function shareResults() {
    
        let lat;
        let lng;

        windows.navigator.geolocation.getCurrentPosition(x => {
          mutate({
            comment: searchParms.get("q")!,
            img: searchParms.get("i")!,
            lat: x.coords.latitude,
            lng: x.coords.longitude,
            author: user?.fullName,
            author_prof: user?.imageUrl
          })
          alert("Shared successfully")
        })
      }


  return (
    <main className="h-[100vh] bg-[#F7F7F7]">
      <div className="mx-[2rem] flex min-h-screen flex-col gap-[3rem] bg-[#F7F7F7] pt-[2rem] ">
        <img src="/logo.png" className="mr-auto w-[40vw]" />
        <div className="flex flex-col items-center justify-center gap-[1.5rem]">
          <div className="flex flex-col items-center justify-center gap-[0rem]">
            <div className="flex flex-row font-bold text-green-600">
              Giving you
            </div>
            <div className="leading-12 content-center text-4xl font-bold">
              Your results
            </div>
          </div>
          <ProgressBar />
        </div>
        <div className="flex flex-col items-center gap-[1rem]">
        <img src={searchParms.get("i")} />
          <div className="w-full items-center justify-center rounded-3xl bg-green-700">
            <div className="p-[2.5rem] text-center text-8xl font-extrabold text-white">
              {searchParms.get("q").slice(3)}
            </div>
          </div>
          <div className="w-10/12 text-center text-sm text-gray-400">
            Environmental Pollution. <a>learn more</a>
          </div>
          <div className="flex flex-row gap-[1rem] items-center">
            <button className="rounded-lg bg-white px-4 py-3 text-left font-semibold text-green-600 shadow-lg">
              View Map
            </button>
            <div className="text-gray-500 font-semibold cursor-pointer" onClick={() => shareResults()}>Share</div>
          </div>
        </div>
      </div>
    </main>
  );
}
