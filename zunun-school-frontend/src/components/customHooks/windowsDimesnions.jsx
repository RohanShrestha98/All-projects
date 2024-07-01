import { useEffect, useState } from "react"

const setWindowsDimensions = () => {
    const width = window.innerWidth
    return width
 }

const useWindowsDimensions = () => {
    const [width, setWidth] = useState(setWindowsDimensions())

    const handleResize = () => {
          setWidth(setWindowsDimensions())
    }

    useEffect(() => {
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    })
    return width
}

export default useWindowsDimensions