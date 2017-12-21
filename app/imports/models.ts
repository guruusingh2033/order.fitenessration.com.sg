import * as _ from 'lodash';
import { Http } from '@angular/http';
import { DateSet } from '../common/scripts/DateSet';
import { addDays, today } from './date';
declare var config:any;
import { orderFulfillmentDays, excludeAvailabilityDate, bundleTotal, bundlePrice, orderSubtotal, orderTotal, orderDeliveryFee, orderTotalMeals, orderQueryTriggers } from '../common/scripts/order';

function serializeArray(array: any[]): any[] {
  return _.map(array, (el) => { return el.serialize(); });
}

class ModelList<T> {
  model;
  list: T[] = [];
  constructor(model, scopes = {}) {
    this.model = model;
    for (var scopeName in scopes) {
      ((scopeName) => {
        Object.defineProperty(this, scopeName, {
          get() {
            return this.find(scopes[scopeName]);
          }
        });
      })(scopeName);
    }
  }
  findById(id: string): T {
    return _.find(this.list, { _id: id });
  }
  add(instance: T): void {
    this.list.push(instance);
  }
  addArray(array): void {
    for (var doc of array) {
      this.add(Model.instantiate(this.model, doc));
    }
  }
  find(query): T[] {
    return _.filter(this.list, query);
  }
  findOne(query): T {
    return this.find(query)[0];
  }
}

class Model {
  _id: string;
  serialize(): string {
    return this._id;
  }
  static instantiate(model, data): any {
    var instance = new model();
    for (var property in data) {
      if (model.mappings && model.mappings[property]) {
        instance[model.mappings[property]] = data[property];
      }
      else {
        instance[property] = data[property];
      }
    }
    return instance;
  }
}

export class AddOn extends Model {
  name: string;
  description: string;
  category: string;
  specifications: string;
  variants: string[];
  price: number;
  images: string[];
}

function amPm(time, appendSuffix=true) {
  var hours = parseInt(time.split(':')[0]);
  var suffix = hours >= 12 ? "pm":"am";
  hours = ((hours + 11) % 12 + 1); 
  return hours + (appendSuffix ? '' + suffix : '');
}


export class TimeSlot extends Model {
  start: string;
  end: string;

  toString() {
    return amPm(this.start, false) + '-' + amPm(this.end);
  }
}

export class Promotion extends Model {
  static mappings = {
    portion: 'portionId',
    mealPlan: 'mealPlanId',
    bundleType: 'bundleTypeId',
  };

  name: string;
  // sku: string;
  deliveryFee: boolean;
  mealPlanId: string;
  portionId: string;
  bundleTypeId: string;
  type: string;
  discount: number;
  overridePrice: number;
  premiumAllowance: number;

  get portion(): Portion {
    return data.portions.findById(this.portionId);
  }
  get mealPlan(): MealPlan {
    return data.mealPlans.findById(this.mealPlanId);
  }
  get bundleType() : BundleType {
    return data.bundleTypes.findById(this.bundleTypeId);
  }

  get displayValue(): string {
    if (this.type == 'discount') {
      return '-' + (this.discount * 100) + '%';
    }
    else if (this.type == 'override') {
      return '$' + this.overridePrice.toFixed(2);
    }
  }
}

export class AnomalyTrigger extends Model {
  static mappings = {
    portion: 'portionId',
    mealPlan: 'mealPlanId',
    bundleType: 'bundleTypeId',
  };

  mealPlanId: string;
  portionId: string;
  bundleTypeId: string;

  quantity: number;
  delay: number;

  alert: { title: string, message: string};
  flagOrder: boolean;
  matchOrders: string;

  get portion(): Portion {
    return data.portions.findById(this.portionId);
  }
  get mealPlan(): MealPlan {
    return data.mealPlans.findById(this.mealPlanId);
  }
  get bundleType() : BundleType {
    return data.bundleTypes.findById(this.bundleTypeId);
  }
}

class IngredientList extends ModelList<Ingredient> {
  main: Ingredient[];
  allergens: Ingredient[];
  constructor() {
    super(Ingredient, {
      main: { type: 'main' },
      allergens: { type: 'allergen' }
    });
  }
}

export class Ingredient extends Model {
  name: string;
  type: string;
  surcharge: number;
  icon: string;
  action: string;
  get slug(): string {
    return this.name.toLowerCase();
  }
  get title(): string {
    return `${this.name} (${this.action})`;
  }
}

export class BundleType extends Model {
  static mappings = {
    portion: 'portionId',
    mealPlan: 'mealPlanId'
  };
  name: string;
  sku: string;
  description: string;
  price: number;
  basicMeals: number;
  premiumMeals: number;
  icon: string;
  portionId: string;
  mealPlanId: string;
  deliveryFee: boolean;
  get portion() : Portion {
    return data.portions.findById(this.portionId);
  }
  get mealPlan() : MealPlan {
    return data.mealPlans.findById(this.mealPlanId);
  }
}

export class LocationSurcharge extends Model {
  surcharge: number;
  postalPrefix: string;
}

export class MealPlan extends Model {
  name: string;
  description: string;
  slug: string;
  icon: string;
}

export class Portion extends Model {
  name: string;
  slug: string;
  description: string;
  icon: string;
}

export class Side extends Model {
  name: string;
}

class MealList extends ModelList<Meal> {
  basic: Meal[];
  premium: Meal[];
  constructor() {
    super(Meal, {
      basic: { grade: 'basic' },
      premium: { grade: 'premium' }
    });
  }
}

export class Meal extends Model {
  static mappings = {
    allergens: 'allergenIds',
    mealPlan: 'mealPlanId',
    portion: 'portionId',
    sides: 'sideIds',
    mainIngredient: 'mainIngredientId'
  };
  name: string;
  grade: string;
  price: number;
  sideIds: string[];
  description: string;
  nutritionFacts: {};
  allergenIds: string[];
  inStock: boolean;
  mealPlanId: string;
  portionId: string;
  mainIngredientId: string;
  primaryImage: string;
  secondaryImage: string;
  stock: number;
  get ingredientsString(): string {
    return [this.mainIngredient.name].concat(_.map(this.allergens, (ingredient) => { return ingredient.name; })).join(', ').toLowerCase();
  }
  get mealPlan(): MealPlan {
    return data.mealPlans.findById(this.mealPlanId);
  }
  get portion(): Portion {
    return data.portions.findById(this.portionId);
  }
  get allergens(): Ingredient[] {
    return _.map(this.allergenIds, (ingredientId) => { return data.ingredients.findById(ingredientId); })
  }
  get sides(): Side[] {
    return _.map(this.sideIds, (sideId) => { return data.sides.findById(sideId); })
  }
  get mainIngredient() : Ingredient {
    return data.ingredients.findById(this.mainIngredientId);
  }
}

class Data {
  addOns: ModelList<AddOn> = new ModelList<AddOn>(AddOn);
  ingredients: IngredientList = new IngredientList();
  bundleTypes: ModelList<BundleType> = new ModelList<BundleType>(BundleType);
  mealPlans: ModelList<MealPlan> = new ModelList<MealPlan>(MealPlan);
  sides: ModelList<Side> = new ModelList<Side>(Side);
  meals: MealList = new MealList();
  portions: ModelList<Portion> = new ModelList<Portion>(Portion);
  timeSlots: ModelList<TimeSlot> = new ModelList<TimeSlot>(TimeSlot);
  anomalyTriggers: ModelList<AnomalyTrigger> = new ModelList<AnomalyTrigger>(AnomalyTrigger);
  locationSurcharges: ModelList<LocationSurcharge> = new ModelList<LocationSurcharge>(LocationSurcharge);
  fulfillmentSettings: { deliveryFee: number, freeDeliveryThreshold: number };
}

export class MealSelection {
  meal: Meal;
  quantity: number = 1;

  constructor(meal: Meal, quantity: number) {
    this.meal = meal;
    this.quantity = quantity;
  }

  serialize(): any {
    return {
      mealId: this.meal._id,
      quantity: this.quantity,
    }
  }
}

// --- delivery options --- //
interface IDeliveryOptions {
  firstName: string;
  surname: string;
  contactNumber: string;
  selfCollection: boolean;
  address: string;
  postalCode: string;
  date: string;
  time: TimeSlot;
  disposableCutlery: boolean;
  note: string;
}

export class DeliveryOptions implements IDeliveryOptions {
  firstName: string = '';
  surname: string = '';
  contactNumber: string = '';
  selfCollection: boolean = false;
  address: string = '';
  postalCode: string = '';
  date: string = '';
  time: TimeSlot = null;
  disposableCutlery: boolean = false;
  note: string = '';

  serialize() {
    return {
      firstName:this.firstName,
      surname:this.surname,
      contactNumber:this.contactNumber,
      selfCollection:this.selfCollection,
      address:this.address,
      postalCode:this.postalCode,
      date:this.date,
      time:this.time ? this.time._id : null,
      disposableCutlery:this.disposableCutlery,
      note:this.note
    };
  }
}

// --- add ons --- //
export class AddOnSelection {
  addOn: AddOn;
  variant: string;
  quantity: number;
  constructor(addOn: AddOn, variant: string, quantity: number) {
    this.addOn = addOn;
    this.variant = variant;
    this.quantity = quantity;
  }
  serialize(): any {
    return {
      addOnId: this.addOn._id,
      variant: this.variant,
      quantity: this.quantity
    };
  }
}

// --- bundles --- //
export class Bundle {
  mealSelections: MealSelection[] = [];
  mealPlan: MealPlan;
  type: BundleType;
  portion: Portion;
  allergies: Ingredient[] = [];
  order: Order;
  promotion: Promotion;
  getMeal(meal: Meal, create = true): MealSelection {
    var i = _.findIndex(this.mealSelections, (m) => { return m.meal._id == meal._id });
    if (i == -1) {
      if (create) {
        var m = new MealSelection(meal, 0);
        this.mealSelections.push(m);
        return m;
      }
      else {
        return null;
      }
    }
    else {
      return this.mealSelections[i];
    }
  }
  addMeal(meal: Meal, force=false): boolean {
    var m = this.getMeal(meal);
    if (this.order.mealQuantity(meal) != meal.stock || force) {
      m.quantity++;      
      return true;
    }
    else {
      return false;
    }
  }
  removeMeal(meal: Meal): void {
    var m = this.getMeal(meal, false);
    if (m && m.quantity > 0) {
      m.quantity--;
      if (m.quantity == 0) {
        _.pull(this.mealSelections, m);
      }
    }
  }

  get price() {
    return bundlePrice(this);
  }

  get promotionDisplay() {
    if (this.promotion) {
      var promotionPrice = this.price;
      return `\$${promotionPrice.toFixed(2)} (${Math.round((1 - promotionPrice/this.type.price) * 100)}%)`;
    }
    else {
      return '$' + this.type.price.toFixed(2);
    }
  }
  get mealCount(): number {
    return this.type.basicMeals;
  }
  get total(): number {
    return bundleTotal(this);
  }
  serialize(): any {
    return {
      mealPlan: this.mealPlan._id,
      type: this.type._id,
      portion: this.portion._id,
      allergies: serializeArray(this.allergies),
      mealSelections: serializeArray(this.mealSelections),
      promotion:this.promotion ? this.promotion.serialize() : undefined,
    };
  }
}

// --- orders --- //
export class Order {
  userId: string;
  id: string;
  bundles: Bundle[] = [];
  addOnSelections: AddOnSelection[] = [];
  deliveryOptions: DeliveryOptions = new DeliveryOptions();
  paymentInfo: PaymentInfo = new PaymentInfo();
  _excludedFulfillmentDates: DateSet = new DateSet();
  availableFulfillmentDates: DateSet = new DateSet();

  constructor() {
    this.availableFulfillmentDates.addRule('exclude', excludeAvailabilityDate({
      excludedFulfillmentDates:this._excludedFulfillmentDates,
      fulfillmentDays: () => { return this.fulfillmentDays; }
    }));
  }


  triggeredAnomalyTriggers: AnomalyTrigger[] = [];
  checkAgainstTriggers() {
    var triggers = orderQueryTriggers(this, data.anomalyTriggers.list, {
      compareObjectId(a, b) { return a == b; }
    });
    var newTriggers = [];
    for (var trigger of triggers) {
      if (!this.triggeredAnomalyTriggers.find(t => t._id == trigger._id)) {
        newTriggers.push(trigger);
      }
    }
    this.triggeredAnomalyTriggers = triggers;

    newTriggers.sort((a, b) => b.delay - a.delay);

    return newTriggers[0];
  }

  get fulfillmentDays(): number {
    return orderFulfillmentDays(this, {
      findOne(collection, query) {
        return data[collection].findOne(query);
      },
      compareObjectId(a, b) {
        return a == b;
      }
    });
  }

  mealQuantity(meal: Meal): number {
    var quantity = 0;
    for (let bundle of this.bundles) {
      for (let mealSelection of bundle.mealSelections) {
        if (mealSelection.meal._id == meal._id) {
          quantity += mealSelection.quantity;
        }
      }
    }
    return quantity;
  }

  addBundle(bundle: Bundle): void {
    this.bundles.push(bundle);
    bundle.order = this;
  }

  excludeFulfillmentDates(rule: Function) {
    this._excludedFulfillmentDates.addRule('include', rule);
  }

  getAddOnSelection(addOn, variant, create = true): AddOnSelection {
    var i = _.findIndex(this.addOnSelections, (a) => { return a.addOn._id == addOn._id && a.variant == variant });
    if (i == -1) {
      if (create) {
        var a = new AddOnSelection(addOn, variant, 0);
        this.addOnSelections.push(a);
        return a;
      }
      else {
        return null;
      }
    }
    else {
      return this.addOnSelections[i];
    }
  }

  addAddOn(addOn, variant): void {
    var addOnSelection = this.getAddOnSelection(addOn, variant);
    addOnSelection.quantity++;
  }

  removeAddOn(addOn, variant): void {
    var addOnSelection = this.getAddOnSelection(addOn, variant, false);
    if (addOnSelection && addOnSelection.quantity > 0) {
      if (!--addOnSelection.quantity) {
        _.pull(this.addOnSelections, addOnSelection);
      }
    }
  }

  get nextAvailableFullilmentDate(): Date {
    return this.availableFulfillmentDates.earliestDate();
  }

  get subtotal(): number {
    return orderSubtotal(this);
  }

  private get totalMeals() {
    return orderTotalMeals(this);
    // return _.reduce(this.bundles, (totalMeals: number, bundle: Bundle) => {
    //   return totalMeals + _.reduce(bundle.mealSelections, (t: number, mealSelection: MealSelection) => {
    //     return t + mealSelection.quantity;
    //   }, 0);
    // }, 0);
  }

  get deliveryFee(): number {
    return orderDeliveryFee(this, {
      fulfillmentSettings: data.fulfillmentSettings,
      locationSurcharges: data.locationSurcharges.list,
      totalMeals(order: Order) {
        return order.totalMeals;
      }
    });
    // if (!this.promotion.deliveryFee || this.deliveryOptions.selfCollection || this.totalMeals >= data.fulfillmentSettings.freeDeliveryThreshold) return 0;
    // else return data.fulfillmentSettings.deliveryFee;
  }

  get total(): number {
    return orderTotal(this);
    // var total = this.subtotal + this.deliveryFee;
    // if (this.promotion) {
    //   if (this.promotion.type == 'discount') {
    //     total -= total*this.promotion.discount;
    //   }
    //   else if (this.promotion.type == 'override') {
    //     total = this.promotion.overridePrice;
    //   }
    // }
    // return total;
  }

  serialize(): any {
    return {
      deliveryOptions: this.deliveryOptions.serialize(),
      addOnSelections: serializeArray(this.addOnSelections),
      bundles: serializeArray(this.bundles),
    };
  }
}

/// --- payment info --- ///
export class PaymentInfo {
  cardNumber: string;
  cvv: string;
  expiryMonth: string;
  expiryYear: string;
}

export var data = new Data();
window['g_data'] = data;
// --- data --- //
export function initData(http: Http, orderId: string, cb: Function): void {
  console.log('initializing data...');
  var init = (d) => {
    data.fulfillmentSettings = d.fulfillmentSettings;
    for (var collection in d.collections) {
      data[collection].addArray(d.collections[collection]);
    }
    console.log('data initialized.');
    cb(d);
  }

  if (window['g_preloadedData']) {
    console.log('using preloaded data');
    // setTimeout(() => {
      init(window['g_preloadedData']);
    // }, 0);
  }
  else {
    http.get(config.dataUrl + (orderId ? '?order=' + orderId : '')).subscribe((response) => {
      console.log('received data');
      init(response.json());
    }, (error) => {
      console.log('failed to initialized data: ' + error);
    });
  }
}
