import authController from './controllers/authController';
import * as Pages from './pages';
import router from './utils/router';

document.addEventListener('DOMContentLoaded', async () => {
    await authController.getUser();
    router
        .use('/', Pages.ChatsPage)
        .use('/messenger', Pages.ChatsPage, { protectedRoute: true, mainPageRoute: true })
        .use('/404', Pages.ErrorPage, { blockProps: { code: 404 }, notFoundRoute: true })
        .use('/500', Pages.ErrorPage, { blockProps: { code: 500 } })
        .use('/sign-in', Pages.LoginPage, {
            blockProps: { type: 'login' },
            leaveIfIsAuth: true,
            loginRoute: true,
        })
        .use('/sign-up', Pages.LoginPage, {
            blockProps: { type: 'registration' },
            leaveIfIsAuth: true,
        })
        .use('/settings', Pages.ProfilePage, { protectedRoute: true })
        .start();
});
