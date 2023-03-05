## What date format to storei in firestore

### objective

1. easy to calculate tomorrow, yesterday, etc => will use dayjs
2. be able to read in firestore (unix timestamp are not human readable)
3. easy to do the cron job etc

### option

1. store in isoString format in UTC timezone => convert to dayjs when use in a program


Icons
FiLogOut
TbTestPipe
BiPlus (no circle)
RiCopperDiamondLine
MdAccountCircle



radio card
  {/* {testingTypeOptions.map((option) => (
              <div key={option.value} className="flex col-span-6 md:col-span-4">
                <input
                  id={option.value}
                  type="radio"
                  value={option.value}
                  className="hidden"
                  checked={type === option.value}
                  {...register("type")}
                />
                <label
                  htmlFor={option.value}
                  className={classNames(
                    "w-full",
                    `${
                      type === option.value
                        ? ACTION_ACTIVE_CARD_CLASSNAMES
                        : ACTION_CARD_CLASSNAMES
                    }`
                  )}
                >
                  <div>{option.label}</div>
                </label>
              </div>
            ))} */}
            

