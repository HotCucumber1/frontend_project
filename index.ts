type Presentation = {
    title: string;
    slides: SlideCollection;
    // history: number[];
    currentSlide: number;
}

type SlideCollection = {
    slides: Slide[];
}

type Slide = {
    id: string;
    background: Background;
    content: SlideContent[];
    orderNumber: number;
    isSelected: boolean;
}

type SlideSelection = {
    selectedSlides: SlideCollection;
}

type ContentSelection = {
    selectedObjects: SlideContent[];
}

type SlideContent = {
    id: string;
    type: string;
    context: TextContent|Image|Figure;
    coords: Point;
    size: Size;
    angle: number;
    isSelected: boolean;
}

type TextContent = {
    content: string;
    fontSize: number;
    fontFamily: string;
    fontStyle: string;
    color: Color;
}

type Figure = {
    color: Color;
    coords: Point;
    size: Size;
}

type Background = {
    type: string;
    context: string|Gradient|Image;
}

type Gradient = {
    colors: Color[];
    angle: number;
}

type Image = {
    url: string;
    alt: string;
    coords: Point;
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