const express = require('express');
const app = express();
const port = 5000;
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const config = require('./config/key');
const { User } = require('./models/User');
const { auth } = require('./middleware/auth');

app.use(cors({
	origin: true, // 요청 허락
	credentials: true, // 쿠키를 받을 수 있도록 허락
}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

const mongoose = require('mongoose');
mongoose.connect(config.mongoURI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true,
	useFindAndModify: false,
}).then(() => console.log('MongoDB conneted...')).catch(err => console.log(err));


app.get('/', (req, res) => res.send('Hello World! 안녕'));

app.get('/api/hello', (req, res) => {
	res.send('안녕하세요');
})

// 회원가입
app.post('/api/users/register', (req, res) => {
	const user = new User(req.body);
	// DB 에 데이터 전송
	user.save((err, userInfo) => {
		if(err) return res.json({success: false, err});
		return res.status(200).json({
			success: true,
		})
	})
});

// 로그인
app.post('/api/users/login', (req, res) => {
	// 요청된 이메일이 DB에 있는지 찾는다.
	User.findOne({ email: req.body.email }, (err, user) => {
		if( !user ){
			return res.json({
				loginSuccess: false,
				message: "등록되지 않은 이메일입니다."
			})
		}

		// 이메일이 있다면 비밀번호가 맞는지 확인
		user.comparePassword(req.body.password, (err, isMatch) => {
			// 비밀번호 틀림
			if( ! isMatch ){
				return res.json({
					loginSuccess: false,
					message: "비밀번호가 틀렸습니다."
				})
			}
			// 토큰 생성
			user.generateToken((err, user) => {
				if( err ) return res.status(400).send(err);

				// 토큰을 저장한다.(쿠키, 로컬스토리지 등)
				res.cookie('x_auth', user.token).status(200).json({
					loginSuccess: true,
					userId: user._id,
					nickName: user.name,
				})
			})
		})
	})
});

// 로그인 한 페이지에서 이용할 수 있도록...
app.get('/api/users/auth', auth, (req, res) => {
	res.status(200).json({
		_id: req.user._id,
		isAdmin: req.user.role !== 0,
		isAuth: true,
		email: req.user.email,
		name: req.user.name,
		role: req.user.role,
		image: req.user.image,
	})
});

// 로그아웃
app.get('/api/users/logout', auth, (req, res) => {
	User.findOneAndUpdate({
		_id: req.user._id
	}, {
		token: ''
	}, (err, user) => {
		if( err ) return res.json({
			success: false, err
		})
		return res.status(200).send({
			success: true,
		})
	})
});


app.listen(port, () => console.log(`Example app listening on port ${port}`));