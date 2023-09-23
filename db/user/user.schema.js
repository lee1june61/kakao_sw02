import { Schema, model } from "mongoose";
import { genSalt, hash } from "bcrypt";
const UserSchema = Schema(
  {
    id: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true, minlength: 8 },
    nickname: { type: String, required: true, maxlength: 20, unique: true },
    role: {
      type: String,
      required: true,
      trim: true,
      enum: ["user", "counselor", "admin"],
    },
    affiliation: {
      type: String,
      required: true,
      enum: ["army", "navy", "airforce", "headquarters"],
    },
    phonenumber: { type: String, required: true, trim: true, unique: true },
    militarybase: { type: String, required: true },
  },
  { collection: "User" }
);

UserSchema.index({ createdAt: 1, updatedAt: 1 });
UserSchema.pre(
  "save",
  function (next) {
    var user = this;
    // 패스워드가 변경될 때만 해싱작업 처리
    if (user.isModified("password")) {
      // geSalt()를 사용해 salt값 생성
      // salt: 공격자가 암호를 유추할 수 없도록, 평문 데이터에 의미 없는 데이터를 뿌려 넣는데 이것을 salt라고 한다.

      // salt값 생성
      genSalt(12, function (err, salt) {
        if (err) return next(err);

        // 생성된 salt값과 비밀번호를 인자로 넘겨준다.
        // hash 생성
        hash(user.password, salt, function (err, hash) {
          if (err) return next(err);
          // hash값을 user.password에 저장
          user.password = hash;
          next(); // save() 처리
        });
      });
    } else {
      next();
    }
  },
  {}
);

UserSchema.methods.comparePassword = function (plainPassword, cb) {
  // 입력한 값: plainPassword가 this.password와 같습니까 ?
  // 같은지 비교하려면 입력한 값을 암호화해서 이미 해싱된 db의 비밀번호와 같은지 확인
  //
  bcypt.compare(plainPassword, this.password, function (err, isMatch) {
    if (err) return cb(err); // cb(callback) => err
    cb(null, isMatch); // err은 null, isMatch는 true를 반환
  });
};

UserSchema.methods.generateToken = function (cb) {
  var user = this; // 만들어진 인스턴스를 user 변수에 저장
  `
  // jsonwebtoken을 이용해서 토큰 생성 (토큰발급)
  // user._id는 db에 이미 저장된 _id
  var token = jwt.sign(user._id.toHexString(), 'secretToken');
  `;
  // 생성된 토큰을 user.token에 저장
  user.token = token;
  user.save(function (err, user) {
    if (err) return cb(err);
    cb(null, user);
  });
};
export const UserModel = model("User", UserSchema);
