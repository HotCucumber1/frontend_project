const START_ANGLE = 0;

type Presentation = {
    title: string;
    slides: SlideCollection;
    currentSlide: number;
    background: Color|Gradient|Image;
    // history: number[];
}
//  TODO: подумать с типами, типом Bg, Bg презентации, SlideCollection

type SlideCollection = {
    slides: Slide[];
}

type Slide = {
    background: Color|Gradient|Image;
    content: SlideContent[];
    position: number;
    isSelected: boolean;
}

type SlideSelection = {
    selectedSlides: SlideCollection;
}

type ContentSelection = {
    selectedObjects: SlideContent[];
}

type SlideContent = {
    id: number;
    type: string;
    context: TextContent|Image|Figure;
    pos: Point;
    size: Size;
    angle: number;
    isSelected: boolean;
}

type TextContent = {
    text: string;
    fontSize: number;
    fontFamily: string;
    fontStyle: string;
    color: Color;
}

type Figure = {
    color: Color;
    pos: Point;
    size: Size;
}

// type Background = {
//     context: Color|Gradient|Image;
// }

type Gradient = {
    colors: Color[];
    angle: number;
}

type Image = {
    url: string;
    alt: string;
    pos: Point;
    size: Size;
}

type Color = {
    value: string;
}

type Point = {
    x: number;
    y: number;
}

type Size = {
    width: number;
    height: number;
}

function setTitle(presentation: Presentation, newTitle: string): Presentation
{
    return {
        ...presentation,
        title: newTitle
    }
}

function addSlide(presentation: Presentation): Presentation
{
    const newSlide: Slide = {
        background: {
            value: "white",
        },
        content: [],
        position: presentation.currentSlide + 1,
        isSelected: false,
    }
    const newSlides: SlideCollection = {
        slides: [...presentation.slides.slides, newSlide]
    }

    return {
        ...presentation,
        slides: newSlides,
    }
}

function deleteSlides(presentation: Presentation): Presentation
{
    const newSlides: SlideCollection = {
        slides: presentation.slides.slides.filter(slide => !slide.isSelected)
    };
    return  {
        ...presentation,
        slides: newSlides,
    }
}

function setSlidePosition(slide: Slide, newPosition: number): Slide
{
    return {
        ...slide,
        position: newPosition,
    }
}

function addSlideText(slide: Slide, newText: TextContent, coords: Point, size: Size): Slide
{
    const newContent: SlideContent = {
        id: slide.content[slide.content.length - 1].id + 1,
        type: "text",
        context: newText,
        pos: coords,
        size: size,
        angle: START_ANGLE,
        isSelected: true,
    };

    return {
        ...slide,
        content: [...slide.content, newContent],
    }
}

function deleteSlideText(slide: Slide): Slide
{
    const newContent = slide.content.filter(item => !item.isSelected);
    return {
        ...slide,
        content: newContent,
    }
}

function setContentPosition(content: SlideContent, newPos: Point): SlideContent
{
    return {
        ...content,
        pos: newPos,
    }
}

function setContentSize(content: SlideContent, newSize: Size): SlideContent
{
    return {
        ...content,
        size: newSize,
    }
}

function setText(content: TextContent, newText: string): TextContent
{
    return {
        ...content,
        text: newText
    }
}

function setFontSize(content: TextContent, newFontSize: number): TextContent
{
    return {
        ...content,
        fontSize: newFontSize,
    }
}

function setFontFamily(content: TextContent, newFontFamily: string): TextContent
{
    return {
        ...content,
        fontFamily: newFontFamily,
    }
}

function setFontStyle(content: TextContent, newFontStyle: string): TextContent
{
    return {
        ...content,
        fontStyle: newFontStyle,
    }
}

function setSlideBackground(slide: Slide, newBackground: Color|Image|Gradient): Slide
{
    return {
        ...slide,
        background: newBackground,
    }
}

function setPresentationBackground(presentation: Presentation, newBackground: Color|Image|Gradient): Presentation
{
    const newSlides: SlideCollection = {
        slides: presentation.slides.slides.map(slide => setSlideBackground(slide, newBackground)),
    }
    return {
        ...presentation,
        slides: newSlides,
    }
}
