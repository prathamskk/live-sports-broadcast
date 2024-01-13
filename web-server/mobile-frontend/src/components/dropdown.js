/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useEffect, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid'

const people = [
  {
    id: 1,
    name: 'Alonso',
    avatar:
      'https://uptwocat.com/player-images/chelsea/Alonso_DAZ_6380-removebg.png',
  },
  {
    id: 2,
    name: 'Azpilicueta',
    avatar:
      'https://uptwocat.com/player-images/chelsea/Azpilicueta_DAZ_6538-removebg.png',
  },
  {
    id: 3,
    name: 'Barkley',
    avatar:
      'https://uptwocat.com/player-images/chelsea/Barkley_DSC_3280-removebg.png',
  },
  {
    id: 4,
    name: 'Chalobah',
    avatar:
      'https://uptwocat.com/player-images/chelsea/Chalobah_DSC_3442-removebg.png',
  },
  {
    id: 5,
    name: 'Chilwell',
    avatar:
      'https://uptwocat.com/player-images/chelsea/Chilwell_DAZ_6565-removebg.png',
  },
  {
    id: 6,
    name: 'Havertz',
    avatar:
      'https://uptwocat.com/player-images/chelsea/Havertz_DAZ_6562-removebg.png',
  },
  {
    id: 7,
    name: 'Christensen',
    avatar:
      'https://uptwocat.com/player-images/chelsea/Christensen_DAZ_6471-removebg.png',
  },
  {
    id: 8,
    name: 'Cedric',
    avatar:
      'https://uptwocat.com/player-images/arsenal/Cedric_1100x693.png',
  },
  {
    id: 9,
    name: 'Elneny',
    avatar:
      'https://uptwocat.com/player-images/arsenal/Elneny_1100x693.png',
  },
  {
    id: 10,
    name: 'Gabriel',
    avatar:
      'https://uptwocat.com/player-images/arsenal/Gabriel_1100x693.png',
  },
  {
    id: 11,
    name: 'Holding',
    avatar:
      'https://uptwocat.com/player-images/arsenal/Holding_1100x693.png',
  },
  {
    id: 12,
    name: 'Lacazette',
    avatar:
      'https://uptwocat.com/player-images/arsenal/Lacazette_1100x693.png',
  },
  {
    id: 13,
    name: 'Lokonga',
    avatar:
      'https://uptwocat.com/player-images/arsenal/Lokonga_1100x693.png',
  },
  {
    id: 14,
    name: 'Martinelli',
    avatar:
      'https://uptwocat.com/player-images/arsenal/Martinelli_1100x693.png',
  },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Dropdown({callBack}) {
  const [selected, setSelected] = useState(people[3])
    useEffect(()=>{callBack(selected)},[selected])
  return (
    <Listbox value={selected} onChange={setSelected}>
      {({ open }) => (
        <>
        
          <div className="relative">
            <Listbox.Button className="relative w-full bg-emerald-500 rounded-md shadow-md  cursor-default flex justify-around align-middle justify-items-center items-center">
              <img src={selected.avatar} alt="" className="flex-shrink-0  h-1/3 w-1/4 " />
              <span className="ml-3 block truncate w-2/4 text-white text-3xl font-semibold">{selected.name}</span>
              <span className="ml-3 flex items-center pr-2 pointer-events-none">
                <SelectorIcon className="h-12 w-12 text-white" aria-hidden="true" />
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 w-full bg-emerald-600 shadow-lg max-h-56 rounded-b-md text-base overflow-auto">
                {people.map((person) => (
                  <Listbox.Option
                    key={person.id}
                    className={({ active }) =>
                      classNames(
                        active ? 'text-white bg-indigo-600' : 'text-gray-900',
                        'cursor-default select-none relative py-2 pl-3 pr-9 border-b-2'
                      )
                    }
                    value={person}
                  >
                    {({ selected, active }) => (
                      <>
                        <div className="flex items-center">
                          <img src={person.avatar} alt="" className="flex-shrink-0 h-1/3 w-1/3" />
                          <span className='ml-3 block truncate text-white font-bold '>
                            {person.name}
                          </span>
                        </div>

                        {selected ? (
                          <span
                            className={classNames(
                              active ? 'text-white' : 'text-indigo-600',
                              'absolute inset-y-0 right-0 flex items-center pr-4'
                            )}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  )
}
