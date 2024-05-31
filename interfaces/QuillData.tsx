import {DeltaStatic} from "quill";

interface QuillData {
    delta: DeltaStatic | undefined,
    html: string,
    text: string,
}

export type {QuillData};