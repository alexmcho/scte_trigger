import { LocalBreak } from "./template_definitions"

export interface KeyNumber{
    key: string;
    value: number;
    type: "terminal"; // Should still be manually defined as "terminal"
    path: string;
}

export interface KeyString{
    key: string;
    value: string;
    type: "terminal"; // Should still be manually defined as "terminal"
    path: string;
}

export interface KeyStringArray {
    key: string;
    value: (string|number|boolean)[];
    type: "stringArray"; // Should still be manually defined as "stringArray"
    path: string;
}

export interface KeyNumberArray {
    key: string;
    value: (string|number|boolean)[];
    type: "numberArray"; // Should still be manually defined as "numberArray"
    path: string;
}

export interface KeyBool {
    key: string;
    value: boolean;
    type: "terminal"; // Should still be manually defined as "terminal"
    path: string;
}

export interface KeyObject {
    key: string;
    value: any[];
    type: "expandable"|"localBreak"|"contentId"|"placementOpportunity"|"Program"|"providerAd"|"nationalBreak";
    path: string;
}

