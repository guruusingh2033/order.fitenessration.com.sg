import { Ingredient } from '../../imports/models';
export declare class AllergyPopupComponent {
    bundleAllergies: Ingredient[];
    static title: string;
    close: any;
    allergies: Ingredient[];
    constructor(bundleAllergies: Ingredient[]);
    private toggle(allergy, b);
    private save();
}
