import React, {
  useRef,
  useEffect,
  useCallback,
  useState,
} from "react";



/** Props
 * Container Class
 * Element Class
 * OnCurrentIndexChange
 * Initalizes the starting index from the prop
 * Style of highlight
 * Style of the current active index
 */


/* Edge cases
    1. Zero element - doesnt render
    2. 1 Element
    3. 2 Element
    4. Number of visible elements exceeding the total size of the container
    5. 0 visible elements
 */


type IProps = {
  containerClass?: string
  elementClass?: string
  activeElementClass?: string
  onChange?: (prevIndex: number, currentIndex: number) => void
  elements?: string[];
  visibleElements?: number;
  initalIndex?: number
};

const elements = Array(5).fill(0).map((i, idx) => idx);

function debounce(func, wait, immediate = false) {
  var timeout;
  return function () {
    var context = this, args = arguments;
    var later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
};

function Wheel({ visibleElements = 3, containerClass = "w-8", elementClass = "w-8 h-8", initalIndex = 2 }: IProps): JSX.Element {
  const [elementHeight, setElementHeight] = useState(0);

  const containerRef = useRef<HTMLUListElement>(null);
  const highlightRef = useRef<HTMLDivElement>(null);
  const [scrollValue, setActiveIndex] = useState<number>(initalIndex);


  const getContainer = (): HTMLUListElement | null => {
    if (containerRef?.current) {
      return containerRef?.current;
    }
    return null;
  };

  const getFirstChildDetails = () => {
    let container = getContainer();
    if (container?.firstChild) {
      return container.firstChild as HTMLElement
    }
    console.error("There are not element present inside the list");
    return null;
  };

  const getLastChildDetails = () => {
    let container = getContainer();
    if (container) {
      let element = container.children[container.children.length - 1] as HTMLElement;
      return element
    }
    console.error("There are not element present inside the list");
    return null;
  };

  // const { currentIndex } = useMemo(() => {

  // }, [elementHeight])

  const handleScrollInsideContainer = () => {
    const container = getContainer();
    let totalScrollTop = container.scrollTop;
    let elementHeight = getFirstChildDetails().clientHeight;
    let currentIndex = Math.round(totalScrollTop / elementHeight)
    console.log("handleScrollInsideContainer currentIndex", currentIndex);
    console.log("handleScrollInsideContainer ", elementHeight);
    setActiveIndex(currentIndex)
  }

  const setContainerHeight = () => {
    let container = getContainer();
    const totalContainerHeight = visibleElements * elementHeight;
    container.style.height = `${totalContainerHeight}px`;
  }

  const setDimensions = useCallback(() => {
    const configureElementHeight = () => {
      let element = getFirstChildDetails();
      setElementHeight(element.offsetHeight)
    }
    configureElementHeight()
  }, [visibleElements]);



  /*
    Assign margins to the first and lastChild so that they start and end at the center
  */
  const setDistanceForScroll = () => {
    const firstchild = getFirstChildDetails();
    const lastChild = getLastChildDetails();
    const container = getContainer();

    const distance = container.offsetHeight / 2 - elementHeight / 2;
    firstchild.style.marginTop = `${distance}px`;
    lastChild.style.marginBottom = `${distance}px`;
  };

  const setHighlightStyle = () => {
    const highlight = highlightRef.current
    const highlightTop = highlight.previousSibling as HTMLElement
    const highlightBottom = highlight.nextSibling as HTMLElement
    const assignGradientAndHeight = (isTop, el) => {
      let height = `${highlight.offsetTop - (elementHeight / 2)}px`
      let color = "white"
      let palette = 'rgba(255, 255, 255, 0.4)'
      let gradient = isTop ? `linear-gradient(${color}, ${palette})` : `linear-gradient(${palette}, ${color})`
      el.style.height = height
      el.style.background = gradient
    }

    assignGradientAndHeight(true, highlightTop)
    assignGradientAndHeight(false, highlightBottom)
  }

  const setupInitialPosition = () => {
    let container = getContainer();
    let scrollTop = 0
    if (initalIndex) {
      scrollTop = initalIndex * elementHeight
    }
    container.scrollTop = scrollTop;
  }

  const setupWheel = useCallback(() => {
    let container = getContainer();
    if (container && container.firstChild) {
      setDimensions();

      setHighlightStyle()
      setupInitialPosition()

      container.addEventListener("scroll", debounce(handleScrollInsideContainer, 100));
      return;
    }
    console.error("container element not found");
  }, []);

  useEffect(() => {
    setupWheel();
  }, [setupWheel, visibleElements]);

  useEffect(() => {
    setContainerHeight()
    setDistanceForScroll();
    handleScrollInsideContainer()
  }, [elementHeight])

  console.log("elementHeight", elementHeight);
  //console.log("");


  const renderItem = () => {
    return elements.map((item, idx) => (
      <li
        style={{
          fontWeight: scrollValue == idx ? "bold" : 'normal'
          //transform: `rotateX(${itemAngle * (idx + 1)}deg)`
        }}
        className={`snap-center flex items-center justify-center cursor-pointer select-none ${elementClass}`}
        key={item}
      >
        {item}
      </li>
    ));
  };

  const renderHighlight = () => {
    return (
      <>
        <div className="absolute top-0 right-0 left-0 pointer-events-none " id="highlightstart"></div>
        <div
          className="absolute top-1/2 border-y-2 -translate-y-1/2 w-28 pointer-events-none"
          ref={highlightRef}
          style={{
            height: elementHeight
          }}
        ></div>
        <div className="absolute bottom-0 w-28 pointer-events-none " id="highlightend"></div>
      </>
    );
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="relative no-scrollbar">
        {renderHighlight()}
        <ul
          className={`max-h-[250px] overflow-y-scroll snap-y snap-mandatory no-scrollbar  ${containerClass}`}
          ref={containerRef}
        >
          {renderItem()}
        </ul>
      </div>
    </div>
  );
}

export default Wheel;





/*

  Current ongoing things
    1. Profile
      1. Vivek - Working towards comppletion of working time
      2. Rishabh - Adding the input time wheel is pending - Important
      3. Interacting with the actual API is also remaining
      4. Adding the Business Address and GST is pending

    2. Login screen
        Kapil is working on consolidating the open defects on the login page

    3. Settings
       1. Will ask Ruchika to take Pranoy's help in closing the open settings part
       2. Take estimate for Settings from Pranoy

    4. Self Sign Up

    4. DX
      1. Shubham needs to provide a roadmap for monorepo structure
      2. Check if possible lets have the integration started

    5. I will have to create the Goals for quarter for which I will have to understand what are things that has be picked up
       for the upcoming quarter
       1. Year Goals
       2. Create quarter wise goals
*/