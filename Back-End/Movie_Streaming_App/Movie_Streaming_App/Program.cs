using BLL.Service;
using BLL.Service.EmailService;
using BLL.ServiceAbstraction;
using DAL;
using DAL.Models;
using DAL.Repos;
using DAL.Shared;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Movie_Streaming_App.Middlewares;
using System.Text;

namespace Movie_Streaming_App
{
    public class Program
    {
        public static async Task Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);
            builder.Services.AddControllers();
            builder.Services.AddHttpsRedirection(options =>
            {
                options.RedirectStatusCode = StatusCodes.Status307TemporaryRedirect;
                options.HttpsPort = 443;
            });

            builder.Services.AddCors(
                c => c.AddPolicy(
                    "allow",
                    c => c.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod()
                ));


            //Mapper
            builder.Services.AddAutoMapper(typeof(BLL.MappingProfiles.AssemblyReference).Assembly);



            //Identity
            builder.Services.AddIdentity<AppUser, IdentityRole<int>>(op =>
            {
                op.Password.RequireLowercase = false;
                op.Password.RequireNonAlphanumeric = false;
                op.Password.RequireLowercase = false;
                op.Password.RequireDigit = false;
                op.Password.RequiredLength = 8;
            }).AddEntityFrameworkStores<AppDbContext>().AddDefaultTokenProviders();
            // DB Context
            builder.Services.AddDbContext<AppDbContext>(
                    op => op.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")).UseLazyLoadingProxies()
                    );


            //For Authentication

            builder.Services.Configure<JwtOptions>(builder.Configuration.GetSection("JwtOptions"));
            builder.Services.AddAuthentication(
                op =>
                {
                    op.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                    op.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                }
                ).AddJwtBearer(op =>
                {
                    var jwtOptions = builder.Configuration.GetSection("JwtOptions").Get<JwtOptions>();
                    op.TokenValidationParameters = new()
                    {
                        ValidateIssuer = true,
                        ValidateAudience = true,
                        ValidateLifetime = true,
                        ValidateIssuerSigningKey = true,
                        ValidIssuer = jwtOptions.Issuer,
                        ValidAudience = jwtOptions.Audience,
                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtOptions.SecretKey)),

                    };
                });



            builder.Services.AddScoped<IAuthenticationService, AuthenticationService>();

            builder.Services.AddScoped<IGenericRepo<UserFavorites>, GenericRepo<UserFavorites>>();
            builder.Services.AddScoped<IUserListRepo<UserFavorites>, UserListRepo<UserFavorites>>();
            builder.Services.AddScoped<IListService<UserFavorites>, ListService<UserFavorites>>();

            builder.Services.AddScoped<IGenericRepo<UserWatch>, GenericRepo<UserWatch>>();
            builder.Services.AddScoped<IUserListRepo<UserWatch>, UserListRepo<UserWatch>>();
            builder.Services.AddScoped<IListService<UserWatch>, ListService<UserWatch>>();

            builder.Services.AddScoped<IEmailService, EmailService>();

            //Payment 
            builder.Services.AddScoped<IPaymentService, PaymentService>();

            builder.Services.AddScoped<IDataSeeding, DataSeeding>();

            builder.Services.AddOpenApi();


            var app = builder.Build();
            await InitializeDatabase(app);

            if (app.Environment.IsDevelopment())
            {
                app.MapOpenApi();
            }
            app.UseMiddleware<CustomExceptionHandler>();

            app.UseHttpsRedirection();
            app.UseHsts();
            app.UseCors("allow");
            app.UseAuthorization();

            app.MapControllers();

            app.Run();
        }
        private static async Task InitializeDatabase(WebApplication app)
        {
            var scope = app.Services.CreateScope();
            var data = scope.ServiceProvider.GetService<IDataSeeding>();
            await data.InitializeIdentityAsync();
        }
    }
}
