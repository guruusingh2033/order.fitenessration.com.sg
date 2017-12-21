export interface IObjectId {
	_str: string;
}

export interface IUser {
	_id: string;
	profile: {
		firstName: string;
		surname: string;
		phoneNumber: string;
		selectedDeliveryAddress: number;
		deliveryAddresses: any[];
		picture: string;
		preferences: {
			mealPlan: IObjectId;
			portion: IObjectId;
			allergies: IObjectId[];
		}
	}
}
