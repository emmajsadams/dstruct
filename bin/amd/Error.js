var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports"], function (require, exports) {
    var BaseException = (function () {
        function BaseException(message) {
            this.error = new Error(message);
            this.error.name = this.name + "Exception";
        }
        return BaseException;
    })();
    exports.BaseException = BaseException;
    var IllegalArgument = (function (_super) {
        __extends(IllegalArgument, _super);
        function IllegalArgument(message) {
            this.name = "IllegalArgument";
            _super.call(this, message);
        }
        return IllegalArgument;
    })(BaseException);
    exports.IllegalArgument = IllegalArgument;
    var IllegalState = (function (_super) {
        __extends(IllegalState, _super);
        function IllegalState(message) {
            this.name = "IllegalState";
            _super.call(this, message);
        }
        return IllegalState;
    })(BaseException);
    exports.IllegalState = IllegalState;
    var NullPointer = (function (_super) {
        __extends(NullPointer, _super);
        function NullPointer(message) {
            this.name = "NullPointer";
            _super.call(this, message);
        }
        return NullPointer;
    })(BaseException);
    exports.NullPointer = NullPointer;
    var IndexOutOfBounds = (function (_super) {
        __extends(IndexOutOfBounds, _super);
        function IndexOutOfBounds(message) {
            this.name = "IndexOutOfBounds";
            _super.call(this, message);
        }
        return IndexOutOfBounds;
    })(BaseException);
    exports.IndexOutOfBounds = IndexOutOfBounds;
    var NotImplemented = (function (_super) {
        __extends(NotImplemented, _super);
        function NotImplemented(message) {
            this.name = "NotImplemented";
            _super.call(this, message);
        }
        return NotImplemented;
    })(BaseException);
    exports.NotImplemented = NotImplemented;
    function notImplemented() {
        throw new NotImplemented().error;
    }
    exports.notImplemented = notImplemented;
    function checkNotNull(argument, message) {
        if (argument === null || argument === undefined) {
            throw new NullPointer(message || "argument is null.").error;
        }
    }
    exports.checkNotNull = checkNotNull;
    function checkArgument(condition, message) {
        if (condition) {
            throw new IllegalArgument(message).error;
        }
    }
    exports.checkArgument = checkArgument;
    function checkIndex(index, size, message) {
        if (index < 0 || index > size) {
            throw new IndexOutOfBounds(message).error;
        }
    }
    exports.checkIndex = checkIndex;
    function checkIndexRange(startIndex, endIndex, size, message) {
        if (startIndex > endIndex || startIndex < 0 || endIndex >= size) {
            throw new IndexOutOfBounds(message).error;
        }
    }
    exports.checkIndexRange = checkIndexRange;
});
