/**
 * The subscription type
 * Possible numeric values are: -1 (remove), 0 (none), 1 (to), 2 (from), 3 (both)
 */
export var Subscription;
(function (Subscription) {
    Subscription["remove"] = "-1";
    Subscription["none"] = "0";
    Subscription["to"] = "1";
    Subscription["from"] = "2";
    Subscription["both"] = "3";
})(Subscription || (Subscription = {}));
