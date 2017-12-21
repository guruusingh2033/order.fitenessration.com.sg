import { Meal } from '../../imports/models';
export declare class MealDetailsComponent {
    private meal;
    constructor(meal: Meal);
    currentImage: number;
    prevImage(): void;
    nextImage(): void;
}
