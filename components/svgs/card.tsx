export default function Card(props: { img, prof, loc, num}) {
    return (
        <div className="flex flex-col gap-[2rem] rounded-xl bg-white">
            <div className="flex flex-col items-center gap-[1rem] p-[0.5rem] pb-[1rem]">
              <img src={props.img} className="w-full rounded-xl" />
              <div className="flex w-11/12 flex-row items-center justify-between gap-[2rem]">
                <div className="flex flex-row items-center gap-[0.7rem]">
                  <img
                    src={props.prof}
                    className="h-[2.5rem] w-[2.5rem]"
                  />
                  <div className="flex flex-col">
                    <div className="font-bold text-black">Laura Fitzgerald</div>
                    <div className="font-regular text-sm text-gray-600">
                      {props.loc}
                    </div>
                  </div>
                </div>
                <div className="flex flex-row items-center justify-center rounded-full bg-gray-100">
                  <div className="bg-gray- p-[1rem] font-bold leading-none">
                    {props.num}
                  </div>
                </div>
              </div>
            </div>
          </div>
    )
}