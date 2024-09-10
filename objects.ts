type Presentation = {
    title: string;
    slides: Slide[];
    selectedSlides: string[];
}

type Slide = {
    id: string;
    background: Color|Gradient|Image;
    content: Array<TextObject|ImageObject|FigureObject>;
    selectedObjects: string[];
}

type SlideObject = {
    id: string;
    pos: Point;
    size: Size;
}

type ImageObject = SlideObject & {
    src: string;
    alt: string;
}

type TextObject = SlideObject & {
    text: string;
    fontSize: number;
    fontFamily: string;
    fontStyle: string;
    color: Color;
}

type FigureObject = SlideObject & {
    fillStyle: Color|Gradient;
    strokeStyle: Color;
    strokeWidth: number;
}

type PathFigureObject = FigureObject & {
    path: Point[];
}

type Gradient = {
    colors: Color[];
    angle: number;
    type: "gradient";
}

type Image = {
    src: string;
    type: "image";
}

type Color = {
    value: string;
    type: "color";
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

function addSlideText(slide: Slide, newText: TextObject, coords: Point, size: Size): Slide
{
    const newContent: SlideObject = {
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

function setContentPosition(content: SlideObject, newPos: Point): SlideObject
{
    return {
        ...content,
        pos: newPos,
    }
}

function setContentSize(content: SlideObject, newSize: Size): SlideObject
{
    return {
        ...content,
        size: newSize,
    }
}

function setText(content: TextObject, newText: string): TextObject
{
    return {
        ...content,
        text: newText
    }
}

function setFontSize(content: TextObject, newFontSize: number): TextObject
{
    return {
        ...content,
        fontSize: newFontSize,
    }
}

function setFontFamily(content: TextObject, newFontFamily: string): TextObject
{
    return {
        ...content,
        fontFamily: newFontFamily,
    }
}

function setFontStyle(content: TextObject, newFontStyle: string): TextObject
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
