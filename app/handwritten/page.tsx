import BlueLayoutCanvas from '@/components/BlueLayoutCanvas'
import GoldLayoutCanvas from '@/components/GoldLayout'
import HandwrittenCanvas from '@/components/HandwrittenCanvas'
import React from 'react'
import { THEMES } from '@/assets/theme'
import GoldLayout from '@/components/GoldLayout'
import { complexMathLinearAlgebraContent } from '@/assets/structuredText'
import BluePastelCanvas from '@/components/BlueLayoutCanvas'

const page = () => {
  return (
    <>
    <BluePastelCanvas theme={THEMES[0]} content={complexMathLinearAlgebraContent} />
    {/* <GoldLayout/> */}
    </>
  )
}

export default page