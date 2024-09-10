import { v4 as uuidv4 } from "uuid";


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
    fontStyle: "italic"|"bold"|"underline";
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

function setPresentationTitle(presentation: Presentation, newTitle: string): Presentation
{
    return {
        ...presentation,
        title: newTitle
    }
}

function addSlide(presentation: Presentation): Presentation
{
    const newSlide: Slide = {
        id: uuidv4(),
        background: {
            value: "white",
            type: "color",
        },
        content: [],
        selectedObjects: [],
    }
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

function setSlidePosition(presentation: Presentation, slide: Slide, newPosition: number): Presentation
{
    const oldSlidePosition: number = presentation.slides.indexOf(slide);
    const newSlides: Slide[] = presentation.slides.slice();
    const [oneSlide] = presentation.slides.slice().splice(oldSlidePosition, 1);

    newSlides.splice(newPosition, 0, oneSlide);
    return {
        ...presentation,
        slides: newSlides,
    }
}

function addTextToSlide(slide: Slide,
                        text: string,
                        position: Point,
                        size: Size,
                        fontSize: number,
                        fontFamily: string,
                        fontStyle: "italic"|"bold"|"underline",
                        color: Color): Slide
{
    const textObject: TextObject = {
        id: uuidv4(),
        pos: position,
        size: size,
        text: text,
        fontSize: fontSize,
        fontFamily: fontFamily,
        fontStyle: fontStyle,
        color: color
    }
    return {
        ...slide,
        content: [...slide.content, textObject],
    }
}

function addImageToSlide(slide: Slide, position: Point, size: Size, src: string, alt: string): Slide
{
    const imageObject: ImageObject = {
        id: uuidv4(),
        pos: position,
        size: size,
        src: src,
        alt: alt,
    }
    return {
        ...slide,
        content: [...slide.content, imageObject],
    }
}

function deleteSlideObject(slide: Slide): Slide
{
    return {
        ...slide,
        content: slide.content.filter(object => !slide.selectedObjects.indexOf(object.id))
    }
}

function setObjectPosition(object: SlideObject, newPosition: Point): SlideObject
{
    return {
        ...object,
        pos: newPosition,
    }
}

function setObjectSize(object: SlideObject, newSize: Size): SlideObject
{
    return {
        ...object,
        size: newSize,
    }
}

function setText(content: TextObject, newText: string): TextObject
{
    return {
        ...content,
        text: newText,
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

function setFontStyle(content: TextObject, newFontStyle: "italic"|"bold"|"underline"): TextObject
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
