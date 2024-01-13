import "../prototypes/array";

export const getTotalSubscriptionsCount = (subscriptions) => {
  return subscriptions.length;
};

export const getTotalSubscriptionsPrice = (subscriptions) => {
  return subscriptions.map((subscription) => Number(subscription.price)).sum();
};

export const getSubscriptionsPriceByActivness = (subscriptions, activeness) => {
  return getTotalSubscriptionsPrice(
    subscriptions.filter((subscription) => subscription.active === activeness),
  );
};
