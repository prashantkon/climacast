export default function Card(props: { img, prof, loc, num, fullname, content}) {
    return (
        <div className="flex flex-col gap-[2rem] rounded-xl bg-white">
            <div className="flex flex-col items-center gap-[1rem] p-[0.5rem] pb-[1rem]">
              <img src={props.img} className="w-[75vw] rounded-xl" />
              {props.content}
              <div className="flex w-11/12 flex-row items-center justify-between gap-[2rem]">
                <div className="flex flex-row items-center gap-[0.7rem]">
                  <img
                    src={props.prof}
                    className="h-8 w-8 rounded-[100000px]"
                  />
                  <div className="flex flex-col">
                    <div className="font-bold text-black">{props.fullname}</div>
                    <div className="font-regular text-sm text-gray-600">
                      {props.loc}
                    </div>
                  </div>
                </div>
                
              </div>
            </div>
          </div>
    )
}