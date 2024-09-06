const START_ANGLE = 90;
// TODO: убрать position слайда, ввести id, в презентацию добавить стартовый id

type Presentation = {
    title: string;
    slides: Slide[];
    currentSlide: number;
    selectedSlides: number[];
    currentSlideId: number;
    // history: number[];
}
//  TODO: подумать с типам, position

type Slide = {
    id: number;
    background: Color|Gradient|Image;
    content: SlideContent[];
    selectedContent: number[];
}

type SlideContent = {
    id: number;
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
    // TODO: добавить фигуры и path (фигурам предусмотреть контур, заливку, толщину контура, замкнутость)
}

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
        id: presentation.currentSlideId++,
        background: {
            value: "white",
        },
        content: [],
        selectedContent: [],
    }
    // TODO: нужно двигать все остальные слайды

    return {
        ...presentation,
        slides: [...presentation.slides, newSlide],
    }
}

function deleteSlides(presentation: Presentation): Presentation
{
    return  {
        ...presentation,
        slides: presentation.slides.filter(slide => !presentation.selectedSlides.indexOf(slide.id)),
    }
}

function setSlidePosition(slide: Slide, newPosition: number): Slide
{
    // TODO: нужно двигать все остальные слайды
}

function addSlideText(slide: Slide, newText: TextContent, coords: Point, size: Size): Slide
{
    const newContent: SlideContent = {
        id: slide.content[slide.content.length - 1].id + 1,
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
    return {
        ...presentation,
        slides: presentation.slides.map(slide => setSlideBackground(slide, newBackground)),
    }
}
