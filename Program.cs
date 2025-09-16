using ajgre_technical_interview.Services;
using ajgre_technical_interview.Validators;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllersWithViews();

builder.Services.AddSingleton<IDatabaseService, DatabaseService>();
builder.Services.AddSingleton<ISanctionedEntityValidator, SanctionedEntityValidator>();

// Configure CORS
builder.Services.AddCors(options =>
{
    if (builder.Environment.IsDevelopment())
    {
        // Dev: allow localhost
        options.AddPolicy("CorsPolicy", policy =>
        {
            policy
                .SetIsOriginAllowed(origin => new Uri(origin).Host == "localhost")
                .AllowAnyMethod()
                .AllowAnyHeader();
        });
    }
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();

// Use the CORS policy
app.UseCors("CorsPolicy");

app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html");

app.Run();
