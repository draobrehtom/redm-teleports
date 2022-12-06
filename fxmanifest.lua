fx_version "adamant"
game "common"
rdr3_warning "I acknowledge that this is a prerelease build of RedM, and I am aware my resources *will* become incompatible once RedM ships."

client_scripts {
	"@PolyZone/client.lua",
	"@PolyZone/CircleZone.lua",

	"config.lua",
	"client/*.lua",
}

server_scripts {
	"server/*.lua"
}

files {
	'dist/images/*.*',
    'dist/*.*',
}
ui_page 'dist/index.html'