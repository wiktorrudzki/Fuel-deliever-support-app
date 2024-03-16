FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
RUN apt-get update && apt-get install -y libgdiplus
ARG BUILD_CONFIGURATION=Debug
ENV ASPNETCORE_ENVIRONMENT=Development
ENV DOTNET_USE_POLLING_FILE_WATCHER=true  
ENV ASPNETCORE_HTTP_PORTS=5000

EXPOSE 5000
COPY ["server.csproj", "/src/"]
WORKDIR /src
RUN dotnet restore
COPY . .
CMD ["dotnet", "watch", "run"]

#WORKDIR /src
#COPY ["server.csproj", "."]
#RUN dotnet restore "./././server.csproj"
#COPY . .
#WORKDIR "/src/."
#RUN dotnet build "./server.csproj" -c $BUILD_CONFIGURATION -o /app/build
#
#FROM build AS publish
#ARG BUILD_CONFIGURATION=Release
#RUN dotnet publish "./server.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false
#
#FROM base AS final
#WORKDIR /app
#COPY --from=publish /app/publish .
#ENTRYPOINT ["dotnet", "watch", "run"]